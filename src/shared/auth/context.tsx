// shared/auth/context.tsx
//
// AuthProvider wraps the entire app and owns:
//   • Current user state
//   • JWT token lifecycle (store → inject → clear)
//   • login / register / logout actions
//   • Session restore on page reload (from localStorage)
//
// C# backend returns:
//   { accessToken: string, expiresIn: number, user: User }
// from POST /api/auth/login and POST /api/auth/register

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import { tokenStore } from '../../shared/api/tokenStore'
import { authApi, userApi } from '../../entities/user/api'
import type { User, LoginDto, RegisterDto } from '../../entities/user/model'

// ── Types ──────────────────────────────────────────────────────
interface AuthContextValue {
  user:         User | null
  isLoading:    boolean      // true while restoring session on mount
  isLoggedIn:   boolean
  login:        (dto: LoginDto)    => Promise<void>
  register:     (dto: RegisterDto) => Promise<void>
  logout:       ()                 => Promise<void>
  refreshUser:  ()                 => Promise<void>  // re-fetch profile
}

// ── Storage keys ──────────────────────────────────────────────
const TOKEN_KEY = 'lumiere_token'

// ── Context ───────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null)

// ── Provider ──────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)

  // On mount: restore token → fetch /api/account/me
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    if (!storedToken) {
      setLoading(false)
      return
    }
    tokenStore.set(storedToken)
    userApi.getMe()
      .then(setUser)
      .catch(() => {
        // Token expired or invalid — clear
        localStorage.removeItem(TOKEN_KEY)
        tokenStore.clear()
      })
      .finally(() => setLoading(false))
  }, [])

  const persistToken = (token: string) => {
    tokenStore.set(token)
    localStorage.setItem(TOKEN_KEY, token)
  }

  const clearSession = () => {
    tokenStore.clear()
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  const login = useCallback(async (dto: LoginDto) => {
    const res = await authApi.login(dto)
    persistToken(res.accessToken)
    setUser(res.user)
  }, [])

  const register = useCallback(async (dto: RegisterDto) => {
    const res = await authApi.register(dto)
    persistToken(res.accessToken)
    setUser(res.user)
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch { /* ignore server errors on logout */ }
    clearSession()
  }, [])

  const refreshUser = useCallback(async () => {
    const updated = await userApi.getMe()
    setUser(updated)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isLoggedIn: !!user,
      login,
      register,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
