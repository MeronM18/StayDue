'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

interface AuthButtonProps {
  /** Button text to display */
  label?: string
  /** Loading text to display */
  loadingLabel?: string
  /** Additional CSS classes */
  className?: string
  /** Variant style */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Callback when auth starts */
  onAuthStart?: () => void
  /** Callback when auth fails */
  onAuthError?: (error: Error) => void
  /** Custom redirect URL after auth */
  redirectTo?: string
  /** Preserve UTM parameters */
  preserveParams?: boolean
}

export function AuthButton({
  label = 'Get Started',
  loadingLabel = 'Signing in...',
  className = '',
  variant = 'primary',
  onAuthStart,
  onAuthError,
  redirectTo,
  preserveParams = true,
}: AuthButtonProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleAuth = async () => {
    try {
      setLoading(true)
      onAuthStart?.()

      // Build redirect URL with preserved params
      let redirectUrl = redirectTo || `${window.location.origin}/auth/callback`
      
      if (preserveParams) {
        const url = new URL(redirectUrl)
        const params = new URLSearchParams(window.location.search)
        
        // Preserve UTM and other marketing params
        const paramsToPreserve = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'referral']
        paramsToPreserve.forEach(param => {
          const value = params.get(param)
          if (value) {
            url.searchParams.set(param, value)
          }
        })
        
        redirectUrl = url.toString()
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          scopes: 'https://www.googleapis.com/auth/calendar',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Error signing in:', error)
        const authError = new Error(error.message || 'Failed to sign in with Google')
        onAuthError?.(authError)
        alert('Error signing in. Please try again.')
        setLoading(false)
        return
      }

      // If successful, redirect will happen automatically
      // Don't set loading to false here as redirect is in progress
    } catch (error) {
      console.error('Unexpected error during auth:', error)
      const authError = error instanceof Error ? error : new Error('An unexpected error occurred')
      onAuthError?.(authError)
      alert('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const baseClasses = 'transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-bold'
  
  const variantClasses = {
    primary: 'bg-[#FFEB3B] text-[#2E2E2E] hover:bg-[#FFEB3B]/95 shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 border-2 border-[#2E2E2E]/10',
    secondary: 'bg-[#B2EBF2] text-[#2E2E2E] hover:bg-[#80DEEA] border-2 border-[#2E2E2E]/10',
    outline: 'bg-transparent text-[#2E2E2E] border-2 border-[#2E2E2E] hover:bg-[#2E2E2E] hover:text-white',
  }

  return (
    <button
      onClick={handleAuth}
      disabled={loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {loading ? loadingLabel : label}
    </button>
  )
}

