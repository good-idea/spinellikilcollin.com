import * as React from 'react'
import {
  ShopifyCollection,
  ShopifyProduct,
  CollectionBlock as CollectionBlockType,
  FilterConfiguration,
} from '../../types'
import {
  ProductGrid,
  ProductGridItem,
  ProductGridItemPadding,
  ProductThumbnail,
} from '../../components/Product'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { Filter } from '../../components/Filter'
import { Heading } from '../../components/Text'
import { Button } from '../../components/Button'
import { CollectionBlock } from '../../components/Collection'
import { definitely } from '../../utils'
import { Wrapper, NoResultsWrapper } from './styled'
import { useShopData } from '../../providers/ShopDataProvider'
import { useSanityQuery } from '../../hooks'
import { buildQuery } from './filterQuery'

const { useState } = React

interface ProductListingProps {
  collection: ShopifyCollection
}

type Item = ShopifyProduct | CollectionBlockType

interface FilterVariables {
  collectionId: string
}

export const ProductListing = ({ collection }: ProductListingProps) => {
  const { productListingSettings } = useShopData()
  const [filterOpen, setFilterOpen] = useState(false)
  const { state, executeQuery, reset: resetQueryResults } = useSanityQuery<
    ShopifyProduct,
    FilterVariables
  >()
  const filterResults = state.results
  const defaultFilter = productListingSettings?.defaultFilter
  const filters = definitely(defaultFilter)
  const {
    preferredVariantMatches,
    products,
    hero,
    collectionBlocks,
  } = collection

  const openFilter = () => setFilterOpen(true)

  // If there are collection blocks, insert them in the array
  // of products by position
  const items = filterResults
    ? filterResults
    : collectionBlocks?.length
    ? definitely(collectionBlocks).reduce<Item[]>((acc, current) => {
        if (!current?.position) return acc
        const index = current.position - 1
        return [...acc.slice(0, index), current, ...acc.slice(index)]
      }, definitely(products))
    : definitely(products)

  const applyFilters = async (filters: null | FilterConfiguration) => {
    if (!filters?.length) {
      resetQueryResults()
      return
    }
    const query = buildQuery(filters)
    if (!collection._id) {
      throw new Error('No _id for this collection was supplied')
    }
    const params = {
      collectionId: collection._id,
    }
    executeQuery(query, params)
  }

  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <Wrapper>
        {filters && filters.length ? (
          <Filter
            applyFilters={applyFilters}
            open={filterOpen}
            filters={filters}
          />
        ) : null}
        {items.length === 0 ? (
          <NoResultsWrapper>
            <Heading level={3} textAlign="center" fontStyle="italic">
              No products found
            </Heading>
            <Button textTransform="initial" onClick={openFilter} level={3}>
              Try using fewer filters
            </Button>
          </NoResultsWrapper>
        ) : (
          <ProductGrid>
            {definitely(items).map((item) => {
              switch (item.__typename) {
                case 'CollectionBlock':
                  return (
                    <ProductGridItem
                      format={item.format}
                      key={item._key || 'some-key'}
                    >
                      <ProductGridItemPadding format={item.format} />
                      <CollectionBlock
                        format={item.format}
                        collectionBlock={item}
                      />
                    </ProductGridItem>
                  )
                case 'ShopifyProduct':
                  return (
                    <ProductGridItem key={item._id || 'some-key'}>
                      <ProductGridItemPadding />
                      <ProductThumbnail
                        product={item}
                        displayPrice
                        imageRatio={0.8}
                        preferredVariantMatches={preferredVariantMatches}
                      />
                    </ProductGridItem>
                  )
              }
            })}
          </ProductGrid>
        )}
      </Wrapper>
    </>
  )
}
