import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'

import { Button, Text, TextInput } from '@ignite-ui/react'

import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter no mínimo 3 letras.' })
    .nonempty()
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O nome do usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    defaultValues: {
      username: '',
    },
  })

  async function handleClaimUsername({ username }: ClaimUsernameFormData) {
    console.log(username)
  }

  const usernameInputErrorMessage = errors?.username
    ? errors?.username?.message
    : 'Digite o nome do usuário desejado'

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('username')}
          autoComplete="off"
        />
        <Button size="sm" type="submit">
          Reservar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">{usernameInputErrorMessage}</Text>
      </FormAnnotation>
    </>
  )
}
