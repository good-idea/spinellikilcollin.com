import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ShopifyCollection } from '../../src/types'
import { sanityQuery } from '../../src/services/sanity'
import { NotFound, ProductListing } from '../../src/views'
import { request } from '../../src/graphql'
import { getParam, definitely } from '../../src/utils'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'
import { createSanityCollectionQuery } from '../../src/views/ProductListing'

export interface CollectionResult {
  Collection: ShopifyCollection
}

interface CollectionResponse {
  allShopifyCollection: ShopifyCollection[]
}

interface CollectionPageProps {
  collection: ShopifyCollection
}

const Collection = ({ collection }: CollectionPageProps) => {
  if (!collection) return <NotFound />
  return (
    <ProductListing
      key={collection._id || 'some-key'}
      collection={collection}
    />
  )
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.collectionSlug)
    return { props: { products: undefined, collection: undefined } }
  const handle = getParam(params.collectionSlug)
  const responses = await Promise.all([
    sanityQuery<ShopifyCollection[]>(createSanityCollectionQuery(), {
      handle,
      productStart: 0,
      productEnd: 13,
      sort: null,
    }),

    requestShopData(),
  ])

  const [collections, shopData] = responses

  return {
    props: {
      shopData,
      params,
      collection: collections[0] || null,
    },
    revalidate: 60,
  }
}

/**
 * Static Routes
 */

const collectionHandlesQuery = gql`
  query CollectionHandlesQuery {
    allShopifyCollection {
      _id
      _updatedAt
      shopifyId
      handle
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await request<CollectionResponse>(collectionHandlesQuery)
  const collections = definitely(result?.allShopifyCollection)
  const paths = collections.map((collection) => ({
    params: {
      collectionSlug: collection.handle ? collection.handle : undefined,
      updatedAt: collection?._updatedAt?.toString(),
    },
  }))

  return {
    paths: paths,
    fallback: true,
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}

export default Collection
