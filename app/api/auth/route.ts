export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { LoginUseCase } from './use-cases/login.usecase'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Dados inválidos', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const usecase = new LoginUseCase()
    const result = await usecase.execute(parsed.data)

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 401 })
    }

    return NextResponse.json(
      { ...result.user, token: result.token },
      { status: 200 }
    )
  } catch (error) {
    console.error('[LOGIN ROUTE]', error)
    return NextResponse.json({ message: 'Erro interno' }, { status: 500 })
  }
}
