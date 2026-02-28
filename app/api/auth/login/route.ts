export const runtime = 'nodejs'

import { LoginSchema } from '@/@schemas/api/auth/auth-schema'
import { NextResponse } from 'next/server'
import { LoginUseCase } from './use-cases/login.usecase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = LoginSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: 'Dados inválidos', errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const usecase = new LoginUseCase()
    return await usecase.execute(parsed.data)
  } catch (error) {
    console.log('Error in login route:', error)
    return NextResponse.json({ message: (error as Error).message }, { status: 500 })
  }
}
