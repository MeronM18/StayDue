import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Get the authenticated user
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Ensure profile exists (trigger should create it, but handle edge cases)
        // Wait a bit for trigger to complete, then check
        let profile = null
        let attempts = 0
        const maxAttempts = 3
        
        while (attempts < maxAttempts && !profile) {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, onboarding_completed')
            .eq('id', user.id)
            .single()
          
          if (data) {
            profile = data
            break
          }
          
          // If profile doesn't exist and trigger should have created it, create it
          if (error && error.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email,
                name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
              })
              .select()
              .single()
            
            if (!insertError) {
              profile = { id: user.id, onboarding_completed: false }
              break
            }
          }
          
          attempts++
          if (attempts < maxAttempts) {
            // Wait 100ms before retry (trigger should complete quickly)
            await new Promise(resolve => setTimeout(resolve, 100))
          }
        }

        // Check if user has completed onboarding
        if (!profile) {
          // Final check after retries
          const { data: finalProfile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', user.id)
            .single()
          profile = finalProfile
        }

        // If onboarding not completed or profile doesn't exist, redirect to onboarding
        if (!profile || !profile.onboarding_completed) {
          const forwardedHost = request.headers.get('x-forwarded-host')
          const isLocalEnv = process.env.NODE_ENV === 'development'
          if (isLocalEnv) {
            return NextResponse.redirect(`${origin}/onboarding`)
          } else if (forwardedHost) {
            return NextResponse.redirect(`https://${forwardedHost}/onboarding`)
          } else {
            return NextResponse.redirect(`${origin}/onboarding`)
          }
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

