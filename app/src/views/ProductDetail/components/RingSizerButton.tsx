import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useModal } from '../../../providers/ModalProvider'
import RingSizerIcon from '../../../svg/RingSizer.svg'
import { Heading } from '../../../components/Text'

import { ShopifyProduct } from '../../../types'

interface RingSizerButtonProps {
  mobile?: boolean
  product: ShopifyProduct
}

interface WithMobile {
  mobile?: boolean
}

const Wrapper = styled.button<WithMobile>`
  ${({ mobile, theme }) => css`
    padding: 0 3;
    display: ${mobile ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;

    ${theme.mediaQueries.tablet} {
      display: ${mobile ? 'flex' : 'none'};
      margin: 3 auto 0;
      padding: 0;
    }
  `}
`

export const RingSizerButton = ({ mobile }: RingSizerButtonProps) => {
  const { openModal } = useModal()
  const handleClick = () => openModal('ringSizer')
  return (
    <Wrapper mobile={mobile} onClick={handleClick}>
      <RingSizerIcon />
      <Heading ml={2} mb={0} level={4} textDecoration="underline">
        Request a sizer
      </Heading>
    </Wrapper>
  )
}