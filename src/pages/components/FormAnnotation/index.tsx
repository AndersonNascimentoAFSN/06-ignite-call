import { Text } from '@ignite-ui/react'
import { ComponentProps } from 'react'
import { FormAnnotationContainer, FormError } from './styles'

type FormAnnotationProps = ComponentProps<typeof Text> & {
  errorMessage: string | undefined
}

export function FormAnnotation({ errorMessage, ...rest }: FormAnnotationProps) {
  return (
    <FormAnnotationContainer>
      <FormError size="sm" /* css={{ color: '$white' }} */ {...rest}>
        {errorMessage}
      </FormError>
    </FormAnnotationContainer>
  )
}
