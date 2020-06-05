import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Carousel } from '../../types'
import { CollectionCarousel, ItemsCarousel } from '../Carousel'
import { Heading } from '../Text'

const CarouselBlockStyled = styled.div`
  ${({ theme }) => css`
    padding: 6;
    grid-column: span 2;
    text-align: center;

    ${theme.mediaQueries.mobile} {
      padding: 5 0;
      overflow: hidden;
    }
  `}
`
interface CarouselBlockProps {
  content: Carousel
}

const CarouselContainer = styled.div``

/**
 * Carousel Block
 *
 * When given props.collection, uses items from that collection
 * to populate a carousel.
 *
 * Otherwise, uses props.items for the carousel
 */

export const CarouselBlock = ({ content }: CarouselBlockProps) => {
  const { title, collection, items } = content
  return (
    <CarouselBlockStyled>
      <Heading level={2}>{title}</Heading>
      <CarouselContainer>
        {collection ? (
          <CollectionCarousel collection={collection} />
        ) : items ? (
          <ItemsCarousel items={items} />
        ) : null}
      </CarouselContainer>
    </CarouselBlockStyled>
  )
}
