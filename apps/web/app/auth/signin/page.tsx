'use client'

import { createClient } from '@/lib/supabase/client'

// Force dynamic rendering - this page should never be statically generated
export const dynamic = 'force-dynamic'
import { Button } from '@staydue/ui'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // Production-ready: Minimal scopes for task management
          // calendar.events: Read, create, update, delete events (tasks)
          // calendar.calendarlist.readonly: See available calendars
          scopes: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent', // Force consent screen to show calendar permission
          },
        },
      })

      if (error) {
        console.error('Error signing in:', error)
        alert('Error signing in. Please try again.')
      }
      // User will be redirected to Google OAuth, then back to callback
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to StayDue
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to manage your tasks
          </p>
        </div>

        <div className="space-y-4">
          <Button
            label={loading ? 'Signing in...' : 'Sign in with Google'}
            onClick={handleGoogleSignIn}
            disabled={loading}
          />

          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p className="mb-2">
              By signing in, you agree to grant StayDue access to:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Your name and email address</li>
              <li>Your Google Calendar (to sync tasks and events)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

