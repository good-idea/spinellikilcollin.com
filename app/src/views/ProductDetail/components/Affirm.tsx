import * as React from 'react'
import { ShopifyProductVariant } from '../../../types'
import { AffirmWrapper } from '../styled'
import { Heading } from '../../../components/Text'

const { useState, useEffect } = React

interface AffirmProps {
  currentVariant: ShopifyProductVariant
}

const toCents = (shopifyPrice: string | number): number =>
  parseInt(shopifyPrice.toString(), 10) * 100

export const Affirm = ({ currentVariant }: AffirmProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const price = currentVariant?.sourceData?.priceV2?.amount

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (window && window.affirm && window.affirm.ui.refresh) {
      // @ts-ignore
      window.affirm.ui.refresh()
    }
  }, [isMounted, price])

  if (!price) return null
  if (!isMounted) return null

  const amount = toCents(price)

  return (
    <AffirmWrapper>
      <Heading level={4} weight={2} my={2}>
        <span
          className="affirm-as-low-as"
          data-amount={amount}
          data-affirm-color="black"
        />
      </Heading>
    </AffirmWrapper>
  )
}
