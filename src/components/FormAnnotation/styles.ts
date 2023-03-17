import { styled, Text } from '@ignite-ui/react'

export const FormAnnotationContainer = styled('div', {
  marginTop: '$2',

  [`> ${Text}`]: {
    color: '$gray800',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68 !important',
})
