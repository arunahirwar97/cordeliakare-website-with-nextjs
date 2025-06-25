// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import LoadingSpinner from '../loading/LoadingComponent'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!loading && !token) {
      router.push('/auth/login')
    }
  }, [ loading, router])

  if (loading) {
    return (<LoadingSpinner />);
  }

  return <>{children}</>
}