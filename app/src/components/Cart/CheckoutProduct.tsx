import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { CheckoutLineItem as CheckoutLineItemType } from 'use-shopify'
import { Heading } from '../../components/Text'
import { Image } from '../../components/Image'
import TrashIcon from '../../svg/TrashCan.svg'
import { Button } from '../../components/Button'
import { Price } from '../../components/Price'
import {
  CheckoutProductWrapper,
  CheckoutItemDetails,
  QuantityInput,
  QuantityWrapper,
} from './styled'

interface CheckoutLineItemProps {
  lineItem: CheckoutLineItemType
}

export const CheckoutProduct = ({ lineItem }: CheckoutLineItemProps) => {
  const { title, variant, quantity } = lineItem
  // const updateLineItemQuantity = props.updateLineItemQuantity
  //
  const updateLineItemQuantity = (args: any) => alert('todo')

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    alert('TODO')
  }

  if (!variant) throw new Error('no variant how?')

  return (
    <CheckoutProductWrapper>
      <Image image={variant.image} />
      <CheckoutItemDetails>
        <div>
          <Heading level={5} weight={2} textTransform="uppercase">
            {title}
          </Heading>
          <Heading level={5} weight={2} mb={0} textTransform="uppercase">
            <Price
              // @ts-ignore
              price={variant.priceV2}
            />
          </Heading>
        </div>
        <Box my={3}>
          <QuantityWrapper>
            <Heading weight={2} my={0} level={5}>
              Quantity:
            </Heading>
            <QuantityInput
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </QuantityWrapper>
          <Heading level={5} weight={2} textTransform="uppercase">
            Total:{' '}
            <Price
              // @ts-ignore
              price={variant.priceV2}
              quantity={quantity}
            />
          </Heading>
        </Box>

        <div>
          <Button level={4} onClick={() => updateLineItemQuantity(0)}>
            Remove <TrashIcon />
          </Button>
        </div>
      </CheckoutItemDetails>
    </CheckoutProductWrapper>
  )
}
