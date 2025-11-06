'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isVisible, setIsVisible] = useState(false)

  // Page fade-in animation
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Reset loading state when page becomes visible (user navigated back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setGoogleLoading(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Also reset on mount in case user navigated back
    setGoogleLoading(false)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true)
      
      // Build redirect URL with preserved params
      const redirectUrl = new URL(`${window.location.origin}/auth/callback`)
      const params = new URLSearchParams(window.location.search)
      
      // Preserve UTM and other marketing params
      const paramsToPreserve = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'referral']
      paramsToPreserve.forEach(param => {
        const value = params.get(param)
        if (value) {
          redirectUrl.searchParams.set(param, value)
        }
      })

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl.toString(),
          scopes: 'https://www.googleapis.com/auth/calendar',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Error signing in with Google:', error)
        setErrors({ submit: error.message || 'Failed to sign in with Google' })
        setGoogleLoading(false)
        return
      }

      // If successful, redirect will happen automatically
    } catch (error) {
      console.error('Unexpected error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setErrors({ submit: errorMessage })
      setGoogleLoading(false)
    }
  }

  return (
    <div 
      className="flex min-h-screen items-center justify-center px-4 py-16 relative transition-opacity duration-500 ease-in-out" 
      style={{ 
        backgroundColor: '#FAFAF5',
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* Back Button - Top Left of Page */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-black hover:bg-gray-50 transition-colors cursor-pointer">
          <span>&lt;</span> Back
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* StayDue Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-1 mb-4">
            <Image 
              src="/assets/stayduelogo.png" 
              alt="StayDue Logo" 
              width={48}
              height={42}
              className="h-auto w-auto"
              priority
            />
            <h1 className="text-3xl font-bold" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>StayDue</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#2E2E2E', fontFamily: 'var(--font-manrope)' }}>Welcome back!</h1>
        </div>

        {/* Sign In Card */}
        <div className="rounded-lg bg-white border border-gray-300 p-6">
          {/* Sign In with Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 rounded-lg border-2 border-black px-6 py-4 text-black hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-base bg-white cursor-pointer"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            {googleLoading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign In with Google</span>
              </>
            )}
          </button>

          {errors.submit && (
            <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600 text-center">{errors.submit}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}

