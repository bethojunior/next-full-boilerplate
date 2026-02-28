import { signJwt } from '@/src/lib/jwt'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export class LoginUseCase {
  async execute(data: { email: string; password: string }) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: data.email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true
        }
      })

      if (!user) {
        return { success: false, message: 'User not found' }
      }

      const match = await bcrypt.compare(data.password, user.password)
      if (!match) {
        return { success: false, message: 'Invalid email or password' }
      }

      const payload = { sub: user.id, email: user.email, name: user.name }

      const accessToken = signJwt(payload)
      const { password, ...userSafe } = user

      return {
        success: true,
        user: userSafe,
        token: accessToken
      }
    } catch (error) {
      console.error('[LOGIN USECASE]', error)
      return { success: false, message: 'Erro ao tentar logar' }
    }
  }
}
