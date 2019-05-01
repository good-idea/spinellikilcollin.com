import * as React from 'react'
import { Product, Variant } from 'use-shopify'
import { unwindEdges } from '../../../utils/graphql'
import { Gallery } from '../../../components/Gallery'

interface ProductImagesProps {
	product: Product
	currentVariant: Variant
}

export const ProductImages = ({ product, currentVariant }: ProductImagesProps) => {
	if (!product.images || !product.images.edges || !product.images.edges.length) return null
	const [images] = unwindEdges(product.images)
	return <Gallery images={images} currentImageId={currentVariant.image.id} />
}