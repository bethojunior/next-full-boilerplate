'use client'
import { IUser as User } from '@/@types/user'
import api from '@/services/api'
import { createContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  updateUser: (updatedUser: User) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    const storedUser = localStorage.getItem('@session-user')
    const token = localStorage.getItem('@session-token')

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    try {
      const response = await api.post('/auth/login', { email, password })

      const { user, token } = response.data

      localStorage.setItem('@session-token', token)
      localStorage.setItem('@session-user', JSON.stringify(user))

      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(user)
      return user
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Login failed'
      throw new Error(errorMessage)
    }
  }

  const logout = () => {
    localStorage.removeItem('@session-token')
    localStorage.removeItem('@session-user')
    setUser(null)
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('@session-user', JSON.stringify(updatedUser))
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
