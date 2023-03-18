// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

import { prisma } from '@/lib/prisma'

import { z, ZodError } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const createUserBodySchema = z.object({
      username: z
        .string({
          required_error: 'Nome de usuário é obrigatório',
          invalid_type_error: 'Nome de usuário deve ser uma string',
        })
        .min(3, {
          message: 'O nome do usuário precisa ter no mínimo 3 letras.',
        })
        .nonempty()
        .regex(/^([a-z\\-]+)$/i, {
          message: 'O nome do usuário pode ter apenas letras e hifens.',
        })
        .transform((username) => username.toLowerCase()),
      name: z
        .string({
          required_error: 'Nome é obrigatório',
          invalid_type_error: 'Nome deve ser uma string',
        })
        .min(3, { message: 'O nome completo precisa ter no mínimo 3 letras.' })
        .nonempty(),
    })

    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const { name, username } = createUserBodySchema.parse(req.body)

    const userExist = await prisma.user.findUnique({
      where: { username },
    })

    if (userExist) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const user = await prisma.user.create({
      data: {
        name,
        username,
      },
    })

    setCookie({ res }, '@ignitecall:userId', user.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return res.status(201).json(user)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(error.formErrors)
    } else {
      return res.status(500).end()
    }
  }
}
