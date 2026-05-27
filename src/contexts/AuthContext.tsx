import { createContext, useContext, useEffect, useState } from 'react'
import type { Models } from 'appwrite'
import { account, ID } from '@/lib/appwrite'

type AppwriteUser = Models.User<Models.Preferences>

interface AuthContextValue {
  user: AppwriteUser | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppwriteUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    account.get()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function signUp(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password)
      // Automatically sign in after registration
      await account.createEmailPasswordSession(email, password)
      const u = await account.get()
      setUser(u)
      return { error: null }
    } catch (e: unknown) {
      return { error: (e as { message?: string })?.message ?? 'Sign-up failed' }
    }
  }

  async function signIn(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password)
      const u = await account.get()
      setUser(u)
      return { error: null }
    } catch (e: unknown) {
      return { error: (e as { message?: string })?.message ?? 'Invalid email or password' }
    }
  }

  async function signOut() {
    await account.deleteSession('current')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
