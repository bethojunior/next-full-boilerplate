import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class CreateUserUseCase {
  async execute(data: { name: string; email: string }) {
    return prisma.user.create({
      data
    })
  }
}
