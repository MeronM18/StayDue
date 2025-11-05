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
      await supabase.auth.signOut()
      router.push('/auth/signin')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
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

