import { IRegister } from '@/@types/auth/auth'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export class RegisterUserUseCase {
  async execute(props: IRegister) {
    try {
      const userExists = await prisma.user.findUnique({
        where: { email: props.email },
      })

      if (userExists) {
        return NextResponse.json({ message: 'Email already in use' }, { status: 409 })
      }

      const hashedPassword = await bcrypt.hash(props.password, 10)

      const user = await prisma.user.create({
        data: { ...props, password: hashedPassword },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      })

      return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
      return NextResponse.json({ message: 'Error to register user' }, { status: 500 })
    }
  }
}
