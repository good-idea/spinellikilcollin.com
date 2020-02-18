import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { UseProductVariant } from 'use-shopify'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { ProductOptionSelector } from './ProductOptionSelector'

interface Props extends UseProductVariant {
  variants: ShopifyProductVariant[]
  product: ShopifyProduct
  quantity: number
  increment: () => void
  decrement: () => void
  setQuantity: (q: number) => void
}

/**
 * ProductVariantSelector
 *
 * - renders a menu, series of buttons, or other UI to select a variant
 * - highlights the current variant
 * - does not render anything if there is only one variant
 */

export const ProductVariantSelector = (props: Props) => {
  const {
    variants,
    currentVariant,
    selectVariant,
    setQuantity,
    product,
  } = props
  if (!variants.length) return null

  const handleSelect = (e) => {
    selectVariant(e.target.value)
  }
  const handleQuantityInput = (e) => setQuantity(e.target.value)

  // information for accordions
  const description = product?.sourceData?.description
  const { options } = product
  return (
    <Box mt={6} mb={3}>
      {options && options.length
        ? options.map((option) =>
            option ? (
              <ProductOptionSelector
                key={option._key || 'some-key'}
                option={option}
              />
            ) : null,
          )
        : null}

      {/* <Label>Size</Label> */}
      {/* <Select
          onChange={handleSelect}
          value={currentVariant.id}
          id="size"
          name="product-size"
        >
          {variants.map((variant) => {
            return (
              <option key={variant.id} value={variant.id}>
                {variant.title}
              </option>
            )
          })}
        </Select> */}
      {/* <Label>Quantity</Label>
        <QuantitySelector width={'52px'}>
          <button type="button" onClick={decrement}>
            <span>&#8722;</span>
          </button>
          <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          <button type="button" onClick={increment}>
            <span>&#43;</span>
          </button>
        </QuantitySelector> */}
    </Box>
  )
}
