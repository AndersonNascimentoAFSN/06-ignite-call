import { z } from 'zod'

export const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome do usuário precisa ter no mínimo 3 letras.' })
    .nonempty()
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O nome do usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  fullName: z
    .string()
    .min(3, { message: 'O nome completo precisa ter no mínimo 3 letras.' })
    .nonempty(),
})

export type RegisterFormData = z.infer<typeof registerFormSchema>
