import { IRegisterUser } from '@/@types/IRegisterUser'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export class RegisterUserUseCase {
  async execute(props: IRegisterUser) {
    try {
      const userExists = await prisma.user.findUnique({
        where: { email: props.email }
      })

      if (userExists) {
        return { success: false, message: 'Este email já está em uso' }
      }

      const hashedPassword = await bcrypt.hash(props.password, 10)

      const user = await prisma.user.create({
        data: {
          name: props.name,
          email: props.email,
          password: hashedPassword
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      })

      return { success: true, user }
    } catch (error) {
      console.error(error)
      return { success: false, message: 'Erro ao registrar usuário' }
    }
  }
}
