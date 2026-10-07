'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, isHydrated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/welcome')
    }
  }, [user, isHydrated, router])

  return <div>Loading...</div>
}
