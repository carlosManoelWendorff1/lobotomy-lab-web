import i18n from '@/plugins/i18n'
import { SellerType } from '@/types/enums/SellerType'
import type IPropertyFilters from '@/types/propertyFilters'

const { t, n } = i18n.global

export const propertyTypesOptions = [
  { label: t('properties.list.filters.apartment'), value: 'apartment' },
  { label: t('properties.list.filters.house'), value: 'house' }
]

export const sellerTypesOptions = [
  {
    label: t('properties.list.filters.realEstateAgency'),
    value: SellerType.REAL_ESTATE_AGENCY
  },
  {
    label: t('properties.list.filters.privateSeller'),
    value: SellerType.PRIVATE_SELLER
  },
  {
    label: t('properties.list.filters.developer'),
    value: SellerType.DEVELOPER
  },
  {
    label: t('properties.list.filters.builder'),
    value: SellerType.BUILDER
  },
  {
    label: t('properties.list.filters.investor'),
    value: SellerType.INVESTOR
  }
]

export const amenitiesOptions = [
  { label: t('properties.list.filters.garage'), value: 'garage' },
  { label: t('properties.list.filters.garden'), value: 'garden' },
  { label: t('properties.list.filters.pool'), value: 'pool' },
  { label: t('properties.list.filters.elevator'), value: 'elevator' },
  { label: t('properties.list.filters.terrace'), value: 'terrace' }
]

export const sortByOptions = [
  { label: t('properties.list.mostRelevant'), value: 'mostRelevant' },
  { label: t('properties.list.priceLowToHigh'), value: 'priceLowToHigh' },
  { label: t('properties.list.priceHighToLow'), value: 'priceHighToLow' },
  { label: t('properties.list.newest'), value: 'newest' }
]

function localizeFilterArray(value: string[]) {
  return value.map((v) => t(`properties.list.filters.${v}`)).join(', ')
}

type FormatFunction = (value: any) => string

const formatMap: Record<string, FormatFunction> = {
  minPrice: (value: number) => n(value, 'currency'),
  maxPrice: (value: number) => n(value, 'currency'),
  minYearBuilt: (value: Date) => value.getFullYear().toString(),
  maxYearBuilt: (value: Date) => value.getFullYear().toString(),
  minSize: (value: number) => `${value}m²`,
  maxSize: (value: number) => `${value}m²`,
  sellerTypes: (value: SellerType[]) => localizeFilterArray(value),
  amenities: (value: string[]) => localizeFilterArray(value)
}

function getActiveFilters(filters: IPropertyFilters) {
  const activeFilters = Object.entries(filters).filter(([, value]) => {
    return Array.isArray(value) ? value.length > 0 : !!value
  })

  return activeFilters
}

function formatActiveFilters(filters: IPropertyFilters, maxFilters: number = 6): string[] {
  const keysToBeExcluded = ['title', 'sortBy']
  const activeFilters = getActiveFilters(filters).filter(([key]) => !keysToBeExcluded.includes(key))

  const formattedFilters = activeFilters.map(([key, value]) => {
    const formatter = formatMap[key] || ((v: any) => v)
    return `${t(`properties.list.filters.${key}`)}: ${formatter(value)}`
  })

  if (formattedFilters.length > maxFilters) {
    formattedFilters.splice(maxFilters, formattedFilters.length - maxFilters, '...')
  }

  return formattedFilters
}

export default {
  propertyTypesOptions,
  sellerTypesOptions,
  amenitiesOptions,
  sortByOptions,
  getActiveFilters,
  formatActiveFilters
}
