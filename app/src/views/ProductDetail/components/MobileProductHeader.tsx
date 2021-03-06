import * as React from 'react'
import { ShopifyProductVariant, ShopifyProduct } from '../../../types'
import { Heading } from '../../../components/Text'
import { Price } from '../../../components/Price'

interface MobileProductHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
}

export const MobileProductHeader = ({
  product,
  currentVariant,
}: MobileProductHeaderProps) => {
  return (
    <>
      <Heading level={3} weight={1}>
        {product.title}
      </Heading>
      {currentVariant?.sourceData?.priceV2 ? (
        <Heading level={5} weight={4}>
          <Price price={currentVariant?.sourceData?.priceV2} />
        </Heading>
      ) : null}
    </>
  )
}
