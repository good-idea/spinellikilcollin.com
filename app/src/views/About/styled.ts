import styled, { css } from '@xstyled/styled-components'

export const PageLinksWrapper = styled.div`
  margin-top: 8;
`

export const PageLinkWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4;
  padding: 8 0;
  border-top: 1px solid;
  border-color: body.7;
`

interface WithIsOdd {
  isOdd: boolean
}

export const PageLinkBody = styled.div<WithIsOdd>`
  ${({ isOdd }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-column: ${isOdd ? '1 / 2' : 'auto'};
    grid-row: ${isOdd ? '1' : 'auto'};
  `}
`

export const ImageWrapper = styled.div<WithIsOdd>`
  ${({ isOdd }) => css`
    grid-column: ${isOdd ? '2 / 3' : 'auto'};
    grid-row: ${isOdd ? '1' : 'auto'};
  `}
`
