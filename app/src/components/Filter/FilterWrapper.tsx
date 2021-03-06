import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { OpenButton, FilterSetWrapper } from './styled'
import { PriceRangeFilter, FilterSet } from '../../types'

const { useState } = React

interface WithOpen {
  open: boolean
}

interface WithType {
  type?: string
  rowSpan?: number
}

const Wrapper = styled.div<WithType>`
  ${({ theme, rowSpan, type }) => css`
    grid-column: ${type === 'PriceRangeFilter' ? 'span 2' : 'auto'};
    grid-row: ${rowSpan ? `span ${rowSpan}` : 'auto'};

    ${theme.mediaQueries.tablet} {
      grid-row: span 1;
    }
    ${theme.mediaQueries.mobile} {
      border-color: body.0;
      border-bottom: 1px solid;
    }

    &:last-of-type {
      ${type === 'PriceRangeFilter'
        ? css`
            grid-column-start: -1;
            grid-column-end: -3;

            ${theme.mediaQueries.tablet} {
              grid-column-start: 2;
              grid-column-end: 4;
            }
          `
        : ''};
    }
  `}
`

const UpDown = styled.div<WithOpen>`
  ${({ open }) => css`
    width: 10px;
    height: 10px;
    border-color: currentColor;
    border-top: 1px solid;
    border-right: 1px solid;
    transform: rotate(${open ? '-45deg' : '135deg'});
    transform-origin: 50% 50%;
    margin-right: 5px;
  `}
`

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: none;

    ${theme.mediaQueries.mobile} {
      justify-content: space-between;
      align-items: center;
      display: flex;
      padding: 0 0;
    }
  `}
`

const Inner = styled.div<WithOpen>`
  ${({ theme, open }) => css`
    ${theme.mediaQueries.mobile} {
      display: ${open ? 'block' : 'none'};
      padding-bottom: 4;

      ${FilterSetWrapper} {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
  `}
`

interface FilterWrapperProps {
  heading?: string | null | void
  children: React.ReactNode
  type: string
  filter: FilterSet | PriceRangeFilter
}

export const FilterWrapper = ({
  type,
  heading,
  children,
  filter,
}: FilterWrapperProps) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)

  const rowSpan =
    filter.__typename === 'FilterSet'
      ? filter && filter?.filters?.length
        ? Math.floor(filter.filters.length / 3)
        : 1
      : undefined

  return (
    <Wrapper rowSpan={rowSpan} type={type}>
      <ButtonWrapper>
        <OpenButton textTransform="upperCase" level={4} onClick={toggleOpen}>
          {heading}
          <UpDown open={open} />
        </OpenButton>
      </ButtonWrapper>
      <Inner open={open}>{children}</Inner>
    </Wrapper>
  )
}
