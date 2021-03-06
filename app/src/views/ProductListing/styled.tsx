import styled, { css } from '@xstyled/styled-components'

interface WrapperProps {
  withHero: boolean
  handle: string
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ handle, theme, withHero }) => css`
    position: relative;
    padding-top: ${withHero ? 0 : theme.navHeight};

    ${handle === 'pink-collection'
      ? css`
          h3 {
            color: body.0;
          }
        `
      : ''}
  `}
`
interface GridWrapperProps {
  isLoading: boolean
}

export const ProductGridWrapper = styled.div<GridWrapperProps>`
  ${({ isLoading }) => css`
    opacity: ${isLoading ? 0.4 : 1};
    position: relative;
    pointer-events: ${isLoading ? 'none' : 'inherit'};
    transition: 0.3s;
  `}
`

export const LoadingWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10;
  top: 150px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NoResultsWrapper = styled.div`
  padding: 8 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
