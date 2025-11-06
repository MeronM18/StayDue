import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export interface UserProfile {
  id: string
  email: string | null
  name: string | null
  onboarding_completed: boolean
  college_university: string | null
  major_minors: string | null
  study_hours_per_week: number | null
  main_academic_goal: string | null
  is_premium: boolean
}

/**
 * Get the authenticated user
 */
export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

/**
 * Get user profile with onboarding status
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const user = await getUser()
  if (!user) {
    return null
  }

  const supabase = await createClient()
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    return null
  }

  return profile as UserProfile
}

/**
 * Check if user has completed onboarding
 */
export async function checkOnboardingStatus(): Promise<boolean> {
  const profile = await getUserProfile()
  return profile?.onboarding_completed ?? false
}

/**
 * Require authentication - redirects to home if not authenticated
 */
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    redirect('/')
  }
  return user
}

/**
 * Require onboarding completion - redirects appropriately
 */
export async function requireOnboarding() {
  const user = await requireAuth()
  const profile = await getUserProfile()
  
  if (!profile?.onboarding_completed) {
    redirect('/onboarding')
  }
  
  return { user, profile }
}

/**
 * Prevent access to onboarding if already completed
 */
export async function requireNotOnboarded() {
  const user = await requireAuth()
  const profile = await getUserProfile()
  
  if (profile?.onboarding_completed) {
    redirect('/dashboard')
  }
  
  return { user, profile }
}

