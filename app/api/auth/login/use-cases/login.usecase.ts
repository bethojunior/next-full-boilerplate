import { signJwt } from '@/src/lib/jwt'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export class LoginUseCase {
  async execute(data: { email: string; password: string }) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      })

      if (!user) {
        return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 })
      }

      const match = await bcrypt.compare(data.password, user.password)
      if (!match) {
        return NextResponse.json({ message: 'Email ou senha inválidos' }, { status: 401 })
      }

      const payload = { sub: user.id, email: user.email, name: user.name }

      const accessToken = signJwt(payload)
      const { password, ...userSafe } = user

      const result = {
        success: true,
        user: userSafe,
        token: accessToken,
      }
      return NextResponse.json({ user: result.user, token: result.token }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: (error as Error).message }, { status: 500 })
    }
  }
}
