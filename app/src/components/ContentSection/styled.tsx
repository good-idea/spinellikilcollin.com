import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { ContentSection } from '../../types'

export const TextBlockWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`

interface WithSection {
  theme: DefaultTheme
  section: ContentSection
}

const ROW_HEIGHT = '620px'
const ROW_HEIGHT_SMALL = '450px'

export const Inner = styled.div`
  ${({ section }: WithSection) => css`
    margin: 0 auto;
    width: 100%;
    flex-grow: 1;
    max-width: xWide;
    padding: 0 5;
    grid-template-rows: calc(${ROW_HEIGHT} - (5 * 2));
    display: ${section.layout === 'carousel' ? 'flex' : 'grid'};
    flex-direction: column;
    grid-gap: 5;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    ${() => {
      switch (section.alignItems) {
        case 'right':
          return css`
            > *:last-child {
              grid-column-start: 2;
            }
          `
        case 'center':
          return `
            > *:last-child {
							grid-column-span: 2;
						}
        `
        default:
          return ''
      }
    }};

    text-align: ${section.textAlign};

    display: ${section.alignItems};
  `}
`

export const Wrapper = styled.div`
  ${({ theme, section }: WithSection) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    min-height: ${section.layout === 'carousel'
      ? ROW_HEIGHT_SMALL
      : ROW_HEIGHT};
    padding: 5;
    ${section.backgroundColor
      ? `background-color: ${theme.color[section.backgroundColor]};`
      : ''}

    ${section.textColor
      ? `color: ${theme.color[section.textColor]};`
      : ''}


    & > * {
      z-index: 1;
      position: relative;
    }

    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
  `}
`
