import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto 6;
  font-family: serif;
  padding: 6 0 0;
  background-color: body.2;
`

export const ProductDetails = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 65% 1fr;
    grid-template-rows: auto auto 1fr;
    grid-column-gap: 5;
    ${theme.mediaQueries.tablet} {
      grid-template-columns: 1fr;
      padding: 0 0 7;
    }
  `}
`

export const AffirmWrapper = styled.div`
  ${({ theme }) => css`
    min-height: 28px;
    ${theme.mediaQueries.tablet} {
      grid-row: 3;
      margin: 0 auto;
      width: 100%;
      max-width: 380px;
    }
  `}
`

export const TitleWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      text-align: center;
      grid-row: 1;
    }
  `}
`

export const ProductInfoWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 6;

    ${theme.mediaQueries.tablet} {
      margin: 0 auto;
      width: 100%;
      max-width: 380px;
    }
  `}
`

export const ProductImagesWrapper = styled.div`
  ${({ theme }) => css`
    grid-row: span 3;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    ${theme.mediaQueries.tablet} {
      grid-row: 2;
    }
  `}
`

export const ProductAccordionsWrapper = styled.div`
  margin-top: 7;
`

export const MobileProductHeaderWrapper = styled.div`
  text-align: center;
  padding-top: 7;
`

export const Nav = styled.div`
  width: calc(100% - 4rem);
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans;
`

export const ProductGalleryWrapper = styled.div`
  position: sticky;
  top: 0;
`

export const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2;
  margin-top: 3;
`

export const DesktopWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      display: none;
    }
  `}
`
export const MobileWrapper = styled.div`
  ${({ theme }) => css`
    display: none;
    ${theme.mediaQueries.tablet} {
      display: block;
    }
  `}
`

export const ThumbnailButton = styled.div`
  cursor: pointer;
`

export const ProductGalleryImage = styled.div``

export const ProductGalleryThumbnails = styled.div`
  flex: 1;
  padding-right: 3;
  > button {
    padding: 3;
  }
`

export const ProductRelatedWrapper = styled.div`
  background-color: body.0;
  padding: 7;
`

export const ProductRelatedInner = styled.div`
  padding: 7 0;
`
