'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
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
        setLoading(false)
      }
      // User will be redirected to Google OAuth, then back to callback
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex w-full flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-16">
          StayDue
        </h1>
        
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="rounded-md bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>
      </main>
    </div>
  );
}
