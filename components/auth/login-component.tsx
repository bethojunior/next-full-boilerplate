'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import RegisterUserComponent from './register-user-component'

export default function LoginComponent() {
  const toast = useToast()
  const router = useRouter()
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('@sesison-user')
    const savedToken = localStorage.getItem('@session-token')
    if (savedUser && savedToken) {
      router.push('/dashboard')
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await login(email, password)
      .then((response) => {
        router.push('/dashboard')
      })
      .catch((error) => {
        toast.toast({
          title: 'Ops...',
          description: 'Ocorreu um erro inesperado',
          variant: 'destructive',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (showRegister) {
    return <RegisterUserComponent />
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className='w-full max-w-md'
      >
        <Card className='rounded-2xl shadow-xl'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-semibold text-center'>Bem-vindo 👋</CardTitle>
            <CardDescription className='text-center'>
              Entre com seu email e senha para continuar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  type='email'
                  placeholder='seu@email.com'
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Senha</Label>
                <div className='relative'>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800'
                  >
                    {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                  </button>
                </div>
              </div>

              <Button type='submit' className='w-full rounded-xl' disabled={loading}>
                {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Entrar'}
              </Button>

              <div className='text-center text-sm text-muted-foreground'>
                Não tem conta?{' '}
                <button
                  type='button'
                  onClick={() => setShowRegister(true)}
                  className='underline hover:text-primary'
                >
                  Criar conta
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
