import { NextResponse } from 'next/server'
import { z } from 'zod'
import { RegisterUserUseCase } from '../use-cases/register-user.usecase'

const schema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsedBody = schema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: 'Dados inválidos',
          errors: parsedBody.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const useCase = new RegisterUserUseCase()

    const result = await useCase.execute(parsedBody.data)

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 })
    }

    return NextResponse.json(
      { message: 'Usuário registrado com sucesso', user: result.user },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
