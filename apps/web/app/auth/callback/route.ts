import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

function getRedirectUrl(request: Request, path: string): string {
  const { origin } = new URL(request.url)
  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = process.env.NODE_ENV === 'development'
  
  if (isLocalEnv) {
    return `${origin}${path}`
  } else if (forwardedHost) {
    return `https://${forwardedHost}${path}`
  } else {
    return `${origin}${path}`
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/dashboard'

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    // Redirect to error page with error details
    const errorUrl = new URL('/auth/auth-code-error', origin)
    if (errorDescription) {
      errorUrl.searchParams.set('error', error)
      errorUrl.searchParams.set('description', errorDescription)
    }
    return NextResponse.redirect(errorUrl.toString())
  }

  if (!code) {
    return NextResponse.redirect(getRedirectUrl(request, '/auth/auth-code-error'))
  }

  try {
    const supabase = await createClient()
    
    // Exchange code for session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError)
      return NextResponse.redirect(getRedirectUrl(request, '/auth/auth-code-error'))
    }

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user:', userError)
      return NextResponse.redirect(getRedirectUrl(request, '/auth/auth-code-error'))
    }

    // Ensure profile exists (trigger should create it, but handle edge cases)
    let profile = null
    let attempts = 0
    const maxAttempts = 5
    const retryDelay = 150 // ms
    
    while (attempts < maxAttempts && !profile) {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('id, onboarding_completed')
        .eq('id', user.id)
        .single()
      
      if (data) {
        profile = data
        break
      }
      
      // If profile doesn't exist and trigger should have created it, create it
      if (profileError && profileError.code === 'PGRST116') {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
          })
          .select('id, onboarding_completed')
          .single()
        
        if (!insertError && newProfile) {
          profile = newProfile
          break
        }
      }
      
      attempts++
      if (attempts < maxAttempts) {
        // Wait before retry (allow trigger to complete)
        await new Promise(resolve => setTimeout(resolve, retryDelay))
      }
    }

    // Final check if profile still doesn't exist
    if (!profile) {
      const { data: finalProfile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .single()
      profile = finalProfile
    }

    // Redirect based on onboarding status
    if (!profile || !profile.onboarding_completed) {
      // New user or incomplete onboarding - redirect to onboarding
      return NextResponse.redirect(getRedirectUrl(request, '/onboarding'))
    }

    // Existing user with completed onboarding - redirect to dashboard or intended destination
    return NextResponse.redirect(getRedirectUrl(request, next))

  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(getRedirectUrl(request, '/auth/auth-code-error'))
  }
}

