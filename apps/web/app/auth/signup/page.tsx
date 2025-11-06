'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Remove notebook theme on signup page
  useEffect(() => {
    const style = document.createElement('style')
    style.setAttribute('data-signup-styles', 'true')
    style.textContent = `
      body::before {
        display: none !important;
      }
      body {
        background-color: #ffffff !important;
        background-image: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      const signupStyle = document.head.querySelector('style[data-signup-styles="true"]')
      if (signupStyle) {
        document.head.removeChild(signupStyle)
      }
    }
  }, [])

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true)
      setErrors({})
      
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image 
              src="/assets/stayduelogo.png" 
              alt="StayDue Logo" 
              width={80}
              height={70}
              className="h-auto w-auto"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">StayDue</h1>
          <p className="text-lg text-gray-600">
            Never miss a deadline again
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="rounded-xl bg-white p-8 shadow-xl border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600">
              Get started with StayDue today
            </p>
          </div>

          {/* Continue with Google Button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 rounded-lg border-2 border-gray-300 px-6 py-4 text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-base shadow-sm hover:shadow-md"
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
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {errors.submit && (
            <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-600 text-center">{errors.submit}</p>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to StayDue's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SignUpForm />
    </Suspense>
  )
}

