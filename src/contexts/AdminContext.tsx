'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface AdminContextType {
  isAdmin: boolean
  isLoading: boolean
  user: any
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    checkAdminStatus()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await checkAdminStatus()
        } else if (event === 'SIGNED_OUT') {
          setIsAdmin(false)
          setUser(null)
          localStorage.removeItem('isAdmin')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        // Check if user has admin role
        const { data: profile, error } = await supabase
          .from('users')
          .select('role, full_name, email')
          .eq('id', user.id)
          .single()

        if (!error && profile?.role === 'admin') {
          setIsAdmin(true)
          setUser({ ...user, profile })
          localStorage.setItem('isAdmin', 'true')
        } else {
          setIsAdmin(false)
          setUser(null)
          localStorage.removeItem('isAdmin')
        }
      } else {
        setIsAdmin(false)
        setUser(null)
        localStorage.removeItem('isAdmin')
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      // Check admin role
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) throw new Error('Failed to verify admin access')
      if (profile?.role !== 'admin') throw new Error('Access denied. Admin privileges required.')

      setIsAdmin(true)
      setUser(data.user)
      localStorage.setItem('isAdmin', 'true')
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setIsAdmin(false)
    setUser(null)
    localStorage.removeItem('isAdmin')
    router.push('/admin/login')
  }

  return (
    <AdminContext.Provider value={{
      isAdmin,
      isLoading,
      user,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}