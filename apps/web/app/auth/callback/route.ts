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
        // Ensure profile exists (create if it doesn't)
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, onboarding_completed')
          .eq('id', user.id)
          .single()

        if (!existingProfile) {
          // Profile doesn't exist, create it
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
            })

          if (insertError) {
            console.error('Error creating profile:', insertError)
            // Continue anyway - will be handled by onboarding
          }
        }

        // Check if user has completed onboarding
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single()

        // If onboarding not completed, redirect to onboarding
        if (!profile?.onboarding_completed) {
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

