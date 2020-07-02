import styled, { css } from '@xstyled/styled-components'

interface BackgroundImageProps {
  imageSrc: string
}

export const ProductThumb = styled.div`
  text-align: left;
  width: 100%;
  a {
    text-decoration: none;

    &:hover {
      color: body.8;
    }
  }
`

interface WithDisplayGrid {
  displayGrid?: boolean
}

export const ProductInfo = styled.div<WithDisplayGrid>`
  ${({ displayGrid }) => css`
    padding: 3 0;
    text-align: center;
    text-transform: capitalize;
    ${displayGrid
      ? css`
          display: grid;
          grid-template-columns: 1fr;
          grid-row-gap: 3;
          grid-template-rows: 1fr 1fr 25px;
          align-items: center;
        `
      : ''}
    @media screen and (min-width: 1000px) {
    }
    h3 {
      font-size: 16px;
    }
  `}
`

export const ImageWrapper = styled.div`
  position: relative;
`

export const TagBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const TagBadge = styled.div`
  border: 1px solid;
  border-color: body.6;
  border-radius: 20px;
  margin: 0 1;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 3 0;
`

export const SwatchesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2;
`

export const SwatchLabel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 50%;
  text-align: center;
  white-space: nowrap;
  transform: translate(-50%);
  transition: 0.2s;
  opacity: 0;
`

interface WithClickable {
  clickable: boolean
  active: boolean
}

export const SwatchWrapper = styled.div<WithClickable>`
  ${({ clickable, active }) => css`
    position: relative;
    width: 23px;
    margin: 0;
    padding-bottom: 2;
    cursor: ${clickable ? 'pointer' : 'inherit'};
    border-bottom: ${active ? '2px solid' : 'none'};
    border-color: body.5;

    & + & {
      margin-left: 2;
    }

    &:hover {
      ${SwatchLabel} {
        opacity: 1;
      }
    }
  `}
`
