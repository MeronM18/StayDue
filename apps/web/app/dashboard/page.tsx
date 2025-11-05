import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@staydue/ui'
import SignOutButton from './sign-out-button'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // Check if user has completed onboarding
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarding_completed')
    .eq('id', user.id)
    .single()

  if (!profile?.onboarding_completed) {
    redirect('/onboarding')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Welcome back, {user.email}!
            </p>
          </div>
          <SignOutButton />
        </div>

        <div className="space-y-4">
          <div className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              User Information
            </h2>
            <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Name:</strong>{' '}
                {user.user_metadata?.full_name ||
                  user.user_metadata?.name ||
                  'Not provided'}
              </p>
              <p>
                <strong>User ID:</strong> {user.id}
              </p>
            </div>
          </div>

          <div className="rounded-md border border-gray-200 p-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Google Calendar Integration
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {user.app_metadata?.provider === 'google'
                ? '✅ Connected to Google Calendar'
                : '⚠️ Google Calendar access not detected'}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Note: Calendar access requires additional OAuth scopes. Check
              Supabase dashboard configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

