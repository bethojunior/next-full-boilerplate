import { z } from 'zod'

export const RegisterUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  phone: z.string().min(10, 'Telefone deve ter no mínimo 10 dígitos'),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
