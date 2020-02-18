import * as React from 'react'
import { formatMoney } from '../../../utils/currency'
import { ShopifyProduct, ShopifySourceProductVariant } from '../../../types'
import { ProductDetailHeaderStyles } from '../styled'
import { Heading } from '../../../components/Text'

interface ProductDetailHeaderProps {
  product: ShopifyProduct
  currentVariant: ShopifySourceProductVariant
  mobile?: string
}

const getOptionByName = ({ selectedOptions }: ShopifySourceProductVariant) => (
  name: string,
): string | void => {
  if (!selectedOptions) return
  const option = selectedOptions.find((option) => {
    if (!option || !option.name) return undefined
    return option.name.toLowerCase() === name.toLowerCase()
  })
  return option ? option.value || undefined : undefined
}

const getVariantTitle = (
  variant: ShopifySourceProductVariant,
): string | void => {
  const getOptionBy = getOptionByName(variant)
  const color = getOptionBy('color')
  if (color) return color
  return undefined
}

export const ProductDetailHeader = ({
  product,
  currentVariant,
  mobile,
}: ProductDetailHeaderProps) => {
  const variantTitle = getVariantTitle(currentVariant)
  return (
    <ProductDetailHeaderStyles mobile={mobile}>
      <Heading level={2} weight={3} mb={2}>
        {product.title}
      </Heading>
      {variantTitle ? (
        <Heading weight={2} level={3} mb={0}>
          {variantTitle}
        </Heading>
      ) : null}
      {currentVariant?.priceV2 ? (
        <Heading level={3} weight={2} mt={3}>
          {formatMoney(currentVariant.priceV2)}
        </Heading>
      ) : null}
      <Heading level={4} weight={2} my={2}>
        Prequalify with Affirm. Todo.
      </Heading>
    </ProductDetailHeaderStyles>
  )
}
