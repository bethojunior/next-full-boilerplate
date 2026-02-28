'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthService } from '@/services/auth/api'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '../ui/use-toast'
import LoginComponent from './login-component'

type RegisterFormData = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function RegisterUserComponent() {
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const passwordValue = watch('password')

  async function onSubmit(data: RegisterFormData) {
    setLoading(true)

    if (data.password !== data.confirmPassword) {
      toast.toast({
        title: 'Erro',
        description: 'As senhas não coincidem',
        variant: 'destructive',
      })
      setLoading(false)
      return
    }

    AuthService.register(data)
      .then(() => {
        toast.toast({
          title: 'Usuário cadastrado com sucesso!',
          description: 'Você já pode fazer login com suas credenciais',
        })

        setShowLogin(true)
      })
      .catch((error) => {
        const apiError = error?.response?.data

        let errorMessage = 'Ocorreu um erro inesperado'

        if (apiError?.errors) {
          const firstField = Object.keys(apiError.errors)[0]
          errorMessage = apiError.errors[firstField]?.[0] || apiError.message
        } else if (apiError?.message) {
          errorMessage = apiError.message
        }

        toast.toast({
          title: 'Ops...',
          description: errorMessage,
          variant: 'destructive',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (showLogin) {
    return <LoginComponent />
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
            <CardTitle className='text-2xl font-semibold text-center'>Criar Conta ✨</CardTitle>
            <CardDescription className='text-center'>
              Preencha os dados abaixo para se cadastrar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nome</Label>
                <Input
                  id='name'
                  placeholder='Seu nome completo'
                  {...register('name', { required: 'Nome é obrigatório' })}
                />
                {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='seu@email.com'
                  {...register('email', { required: 'Email é obrigatório' })}
                />
                {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  type='tel'
                  placeholder='(00) 00000-0000'
                  {...register('phone', { required: 'Telefone é obrigatório' })}
                />
                {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Senha</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    {...register('password', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'Mínimo de 6 caracteres',
                      },
                    })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800'
                  >
                    {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-sm text-red-500'>{errors.password.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='confirmPassword'>Confirmar Senha</Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    {...register('confirmPassword', {
                      required: 'Confirmação obrigatória',
                      validate: (value) => value === passwordValue || 'As senhas não coincidem',
                    })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='w-4 h-4' />
                    ) : (
                      <Eye className='w-4 h-4' />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type='submit' className='w-full rounded-xl' disabled={loading}>
                {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Criar conta'}
              </Button>

              <div className='text-center text-sm text-muted-foreground'>
                Já tem conta?{' '}
                <button
                  type='button'
                  onClick={() => setShowLogin(true)}
                  className='underline hover:text-primary'
                >
                  Fazer login
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
