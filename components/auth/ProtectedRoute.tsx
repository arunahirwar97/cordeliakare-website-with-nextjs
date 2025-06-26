// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import LoadingSpinner from '../loading/LoadingComponent'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading, token } = useAuth()
  const router = useRouter()
  console.log("HERE IS TOKEN" , token)
  useEffect(() => {
    if (!loading && !token) {
      router.push('/auth/login')
    }
  }, [ loading, router, token])

  if (loading) {
    return (<LoadingSpinner />);
  }

  return <>{children}</>
}