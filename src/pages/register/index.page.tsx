import { useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'

import { FormAnnotation } from '../components/FormAnnotation'

import { RegisterFormData, registerFormSchema } from './validationsForm'

import { Container, Form, Header } from './styles'

export default function Register() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: '',
      username: '',
    },
  })

  const handleRegisterProfile = useCallback(
    ({ fullName, username }: RegisterFormData) => {
      console.log(fullName, username)
    },
    [],
  )

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegisterProfile)}>
        <label>
          <Text size="sm">Nome de usuário</Text>
          <TextInput
            prefix="ignite.com/"
            placeholder="seu-usuario"
            autoComplete="off"
            {...register('username')}
          />

          {errors?.username && (
            <FormAnnotation errorMessage={errors.username.message} />
          )}
        </label>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput
            placeholder="Seu nome"
            autoComplete="off"
            {...register('fullName')}
          />

          {errors?.fullName && (
            <FormAnnotation errorMessage={errors.fullName.message} />
          )}
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Próximo passo
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}