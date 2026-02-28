import { RegisterUserSchema } from '@/@schemas/api/auth/auth-schema'
import { NextResponse } from 'next/server'
import { RegisterUserUseCase } from './use-cases/register-user.usecase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = RegisterUserSchema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: 'Invalid input data',
          errors: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const useCase = new RegisterUserUseCase()
    return await useCase.execute(parsedBody.data)
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
