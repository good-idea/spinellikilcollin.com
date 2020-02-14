import * as React from 'react'
import { Header2 } from '../../components/Text'
import { ShopifyCollection } from '../../types'
import { FlexContainer, FlexHalf } from '../../components/Layout/Flex'

interface ProductListingHeaderProps {
  collection: ShopifyCollection
}

export const ProductListingHeader = ({
  collection,
}: ProductListingHeaderProps) => {
  const { title, sourceData } = collection
  const { description, image } = sourceData || {}

  if (image) {
    return (
      <FlexContainer
        height="600px"
        padding="small"
        center
        style={{
          backgroundImage: `url(${image.originalSrc})`,
          backgroundSize: 'cover',
        }}
      >
        {/* <FlexHalf vertical="center" padding="0 60px">
          <Header2>{title}</Header2>
          <p>{description}</p>
        </FlexHalf> */}
        {/* <FlexHalf
          style={{
            backgroundImage: `url(${image.originalSrc})`,
            backgroundSize: 'cover',
          }}
        ></FlexHalf> */}
      </FlexContainer>
    )
  } else {
    return (
      <FlexContainer
        center
        text="center"
        align="center"
        padding="small"
        vertical="center"
        maxwidth="600px"
        marginVertical="triple"
        margin="triple"
      >
        <Header2>{title}</Header2>
        <p>{description}</p>
      </FlexContainer>
    )
  }
}
