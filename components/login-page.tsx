'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
// import

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (email.trim() && password.trim()) return onLogin()

    alert('Por favor, preencha e-mail e senha')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <div className="w-24 h-24 flex items-center justify-center mb-4 mx-auto">
          <Image
            src="/logo.jpeg"
            alt="R3TURN Logo"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-orange-500 text-center mb-8">
        Sistema de fiscalização
        <br />
        Não invasiva
      </h2>

      {/* Card de Login */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-black">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleLogin}>
            Entrar
          </Button>
          <div className="text-right">
            <a href="#" className="text-sm text-black hover:underline">
              Esqueci minha senha
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Suporte */}
      <div className="mt-8 w-full max-w-md">
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <span className="text-sm">Para suporte, clique aqui!</span>
            <MessageCircle className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
