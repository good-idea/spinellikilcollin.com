import * as React from 'react'
import {
  FilterSet as FilterSetType,
  PriceRangeFilter as PriceRangeFilterType,
  FilterConfiguration,
  PriceRangeFilterConfiguration,
  FilterMatchGroup,
  PRICE_RANGE_FILTER,
  FILTER_MATCH_GROUP,
} from '../../types'
import { FilterSet } from './FilterSet'
import { PriceRangeFilter } from './PriceRangeFilter'
import {
  Wrapper,
  Inner,
  OpenButton,
  FilterSets,
  Header,
  ButtonsWrapper,
} from './styled'
import { definitely } from '../../utils'
import { useFilterState, FilterSetState } from './reducer'
import { Button } from '../../components/Button'
import { PlusMinus } from '../../components/PlusMinus'
import { FilterWrapper } from './FilterWrapper'
import { Sort, SortButton } from './SortButton'

const { useEffect, useState } = React

type FilterType = FilterSetType | PriceRangeFilterType

interface FilterProps {
  filters: FilterType[] | null
  applySort: (sort: Sort) => void
  applyFilters: (filterConfiguration: null | FilterConfiguration) => void
  open?: boolean
}

const getCurrentFilters = (
  filters: FilterType[],
  filterSetStates: FilterSetState[],
): FilterConfiguration => {
  return filterSetStates.reduce<FilterConfiguration>((acc, setState) => {
    const filter = filters.find((filter) => filter._key === setState.key)
    if (!filter) return acc
    if (filter.__typename === 'FilterSet') {
      const filterSetFilters = definitely(filter.filters)
      const activeMatchKeys = setState.activeMatchKeys
      if (activeMatchKeys.length === 0) return acc
      const filterMatches = filterSetFilters
        .filter((fsf) => activeMatchKeys.includes(fsf._key || 'some-key'))
        .map((fsf) => definitely(fsf.matches))
        .flat()

      const matchGroup: FilterMatchGroup = {
        filterType: FILTER_MATCH_GROUP,
        matches: filterMatches,
      }
      return [...acc, matchGroup]
    } else if (filter.__typename === 'PriceRangeFilter') {
      const filterSetState = filterSetStates.find(
        (fss) => fss.key === filter._key,
      )

      const minPrice = filterSetState?.values?.minPrice
      const maxPrice = filterSetState?.values?.maxPrice

      if (typeof minPrice !== 'number') {
        throw new Error('currentMinPrice must be a number')
      }

      if (typeof maxPrice !== 'number') {
        throw new Error('currentMaxPrice must be a number')
      }

      const priceRangeFilter: PriceRangeFilterConfiguration = {
        filterType: PRICE_RANGE_FILTER,
        key: filter._key || 'some-key',
        minPrice,
        maxPrice,
      }
      return [...acc, priceRangeFilter]
    }
    return acc
  }, [])
}

export const Filter = ({
  filters,
  applyFilters,
  applySort,
  open: parentOpen,
}: FilterProps) => {
  const [open, setOpen] = useState(false)
  const { filterSetStates, setValues, resetAll, resetSet, toggle } =
    useFilterState(definitely(filters))

  if (!filters || filterSetStates.length === 0) return null

  const toggleOpen = () => setOpen(!open)

  useEffect(() => {
    setOpen(parentOpen ?? false)
  }, [parentOpen])

  const handleSubmit = () => {
    const filterMatches = getCurrentFilters(filters, filterSetStates)
    applyFilters(filterMatches)
    setOpen(false)
  }

  const handleReset = () => {
    resetAll()
    applyFilters(null)
    setOpen(false)
  }

  return (
    <Wrapper>
      <Header>
        <OpenButton level={5} onClick={toggleOpen}>
          Filter
          <div>
            <PlusMinus open={open} />
          </div>
        </OpenButton>
        <SortButton applySort={applySort} />
      </Header>
      <Inner open={open}>
        <FilterSets>
          {open
            ? filters.map((filter) =>
                filter.__typename === 'FilterSet' ? (
                  <FilterWrapper
                    key={filter._key || 'some-key'}
                    heading={filter.heading}
                    type={filter.__typename}
                    filter={filter}
                  >
                    <FilterSet
                      setKey={filter._key || 'some-key'}
                      filterSetState={filterSetStates.find(
                        (s) => s.key === filter._key,
                      )}
                      resetSet={resetSet(filter._key || 'some-key')}
                      toggleMatch={toggle(filter._key || 'some-key')}
                      filterSet={filter}
                    />
                  </FilterWrapper>
                ) : filter.__typename === 'PriceRangeFilter' ? (
                  <FilterWrapper
                    heading="Price Range"
                    key={filter._key || 'some-key'}
                    type={filter.__typename}
                    filter={filter}
                  >
                    <PriceRangeFilter
                      setKey={filter._key || 'some-key'}
                      filterSetState={filterSetStates.find(
                        (s) => s.key === filter._key,
                      )}
                      setValues={setValues(filter._key || 'some-key')}
                      resetSet={resetSet(filter._key || 'some-key')}
                      priceRangeFilter={filter}
                    />
                  </FilterWrapper>
                ) : null,
              )
            : null}
        </FilterSets>
        <ButtonsWrapper>
          <Button type="button" onClick={handleSubmit}>
            Apply Filters
          </Button>
          <Button level={2} type="button" onClick={handleReset}>
            Clear Filters
          </Button>
        </ButtonsWrapper>
      </Inner>
    </Wrapper>
  )
}
