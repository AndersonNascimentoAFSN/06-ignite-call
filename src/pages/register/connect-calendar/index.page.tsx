import { useCallback } from 'react'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'

import { api } from '@/lib/axios'

import { Container, Header } from '../styles'

import { AxiosError } from 'axios'
import { ConnectBox, ConnectItem } from './styles'

export default function Register() {
  // const router = useRouter()

  // const handleRegisterProfile = useCallback(
  //   async ({ fullName, username }: RegisterFormData) => {
  //     try {
  //     } catch (error) {
  //       /*   if (error instanceof AxiosError && error?.response?.data?.message) {
  //         alert(error?.response?.data?.message)
  //       } */
  //       if (error instanceof AxiosError && error?.message) {
  //         alert(error?.message)
  //       } else {
  //         console.log(error)
  //       }
  //     }
  //   },
  //   [],
  // )

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>

        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button variant="secondary" size="sm">
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
