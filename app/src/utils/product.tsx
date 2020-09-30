import {
  ShopifyProduct,
  ShopifyProductOptionValue,
  ShopifyProductOption,
  ShopifySourceProductVariant,
  ShopifyProductVariant,
  Maybe,
  ShopifyMoneyV2,
  Image,
} from '../types'
import { definitely } from '../utils'

export interface SelectedProductOption {
  name: string
  currentValue: string
}

export const isValidSwatchOption = (option: ShopifyProductOption): boolean =>
  definitely(option.values).every(({ swatch }) =>
    Boolean(swatch && swatch.asset),
  )

export const getSwatchOptions = (
  options?: Maybe<Array<Maybe<ShopifyProductOption>>>,
): ShopifyProductOption[] =>
  definitely(options).filter((option) => isValidSwatchOption(option))

export const getSwatchImages = ({ values }: ShopifyProductOption): Image[] =>
  definitely(values)
    .map(({ swatch }) => swatch)
    .reduce<Image[]>((acc, o) => (o ? [...acc, o] : acc), [])

export const optionMatchesVariant = (
  optionName: string,
  option: ShopifyProductOptionValue,
  variant: ShopifyProductVariant | ShopifySourceProductVariant,
): boolean => {
  const selectedOptions =
    variant.__typename === 'ShopifyProductVariant'
      ? variant?.sourceData?.selectedOptions
      : variant?.selectedOptions

  return definitely(selectedOptions).some(
    (vso) => optionName === vso.name && option.value === vso.value,
  )
}

export const getSelectedOptionValues = (
  product: ShopifyProduct,
  variant: ShopifyProductVariant | ShopifySourceProductVariant,
): ShopifyProductOptionValue[] => {
  const source =
    variant.__typename === 'ShopifyProductVariant'
      ? variant.sourceData
      : variant

  const variantSelectedOptions = source?.selectedOptions
  if (!product.options || !variantSelectedOptions) return []

  const selectedOptionValues = definitely(product?.options).reduce<
    ShopifyProductOptionValue[]
  >((acc, currentOption) => {
    const currentOptionValues = definitely(currentOption?.values).filter((co) =>
      optionMatchesVariant(currentOption?.name || 'foo', co, variant),
    )
    return [...acc, ...currentOptionValues]
  }, [])
  return definitely(selectedOptionValues)
}

export const getAdditionalDescriptions = (
  selectedOptions: ShopifyProductOptionValue[],
) => {
  return definitely(
    selectedOptions.map(({ _key, descriptionRaw }) =>
      descriptionRaw ? { _key, descriptionRaw } : null,
    ),
  )
}

/**
 * Get the first variant that matches the selected option
 */
export const getVariantBySelectedOption = (
  variants: ShopifySourceProductVariant[],
  currentOption: SelectedProductOption,
): ShopifySourceProductVariant | void =>
  variants.find((variant) => {
    const { selectedOptions } = variant
    return definitely(selectedOptions).some(
      (option) =>
        option.name === currentOption.name &&
        option.value === currentOption.currentValue,
    )
  })

export const getBestVariantByMatch = (
  variants: ShopifySourceProductVariant[],
  matches: string[],
): ShopifySourceProductVariant => {
  const bestVariant = variants.find((v) =>
    matches.some((m) => v?.title?.includes(m)),
  )
  return bestVariant || variants[0]
}

export const isValidPrice = (price: Maybe<ShopifyMoneyV2>): boolean => {
  if (!price || !price.amount || price.currencyCode === 'NONE') return false
  return true
}

export const getVariantTitle = (
  product: ShopifyProduct,
  variant: ShopifyProductVariant | ShopifySourceProductVariant,
): string | null | undefined => {
  if (product?.variants?.length && product.variants.length < 2) {
    // If there is only one variant, its name will be "Default Title",
    // so we should return the product title instead.
    return product?.title
  }

  const source =
    variant.__typename === 'ShopifyProductVariant'
      ? variant.sourceData
      : variant

  // Parse the product title by combining the selected option
  // values, omitting the "Size" option
  const titleByOptions = source?.selectedOptions?.length
    ? definitely(source.selectedOptions)
        .map((option) => {
          if (option.name === 'Size') return null
          return option.value
        })
        .filter(Boolean)
        .join(' | ')
    : undefined

  if (titleByOptions?.length) return titleByOptions

  return product?.title
}

export const getProductGoogleCategory = (
  product: ShopifyProduct,
): number | undefined => {
  switch (product?.sourceData?.productType?.toLowerCase()) {
    case 'bracelets':
      return 191
    case 'earrings':
      return 194
    case 'necklace':
      return 196
    case 'ring':
      return 200
    case 'clothing':
      return 1604
    case 'candle':
      return 588
    case 'furniture':
      return 436
    case 'gift card':
      return 53
    case 'sunglasses':
      return 178
    default:
      return 188
  }
}
