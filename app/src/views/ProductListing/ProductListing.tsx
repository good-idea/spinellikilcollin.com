import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useQuery } from 'urql'
import { Product } from 'use-shopify'
import { COLLECTION_QUERY, CollectionResult } from './query'
import { ProductGrid } from './styled'
import { ProductThumbnail } from './ProductThumbnail'
import { ProductListingHeader } from './ProductListingHeader'
import { ProductListingFilter } from './ProductListingFilter'

interface ProductListingProps {
  match: {
    params: {
      handle: string
    }
  }
}

export const ProductListing = ({ match }: ProductListingProps) => {
  const { handle } = match.params
  const variables = { handle }
  const [response] = useQuery<CollectionResult>({
    query: COLLECTION_QUERY,
    variables,
  })

  if (response.fetching || !response.data) return <p>Loading..</p>
  const collection = response.data.collectionByHandle
  const [products] = unwindEdges<Product>(collection.products)
  return (
    <React.Fragment>
      <ProductListingFilter collection={collection} />
      <ProductListingHeader collection={collection} />
      <ProductGrid>
        {products.map((product) => {
          return <ProductThumbnail key={product.id} product={product} />
        })}
      </ProductGrid>
    </React.Fragment>
  )
}
