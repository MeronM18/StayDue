'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@staydue/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignOutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      setLoading(true)
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Error signing out:', error)
        alert('Error signing out. Please try again.')
        return
      }

      // Clear any local storage (if needed)
      if (typeof window !== 'undefined') {
        localStorage.clear()
      }

      // Redirect to home page
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Unexpected error during sign out:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      label={loading ? 'Signing out...' : 'Sign Out'}
      onClick={handleSignOut}
      disabled={loading}
    />
  )
}

