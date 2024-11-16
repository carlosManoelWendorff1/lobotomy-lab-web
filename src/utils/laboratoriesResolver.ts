import i18n from '@/plugins/i18n'
import { SellerType } from '@/types/enums/SellerType'
import type IlaboratoryFilters from '@/types/laboratoryFilters'

const { t, n } = i18n.global

export const laboratoryTypesOptions = [
  { label: t('laboratories.list.filters.apartment'), value: 'apartment' },
  { label: t('laboratories.list.filters.house'), value: 'house' }
]

export const sellerTypesOptions = [
  {
    label: t('laboratories.list.filters.realEstateAgency'),
    value: SellerType.REAL_ESTATE_AGENCY
  },
  {
    label: t('laboratories.list.filters.privateSeller'),
    value: SellerType.PRIVATE_SELLER
  },
  {
    label: t('laboratories.list.filters.developer'),
    value: SellerType.DEVELOPER
  },
  {
    label: t('laboratories.list.filters.builder'),
    value: SellerType.BUILDER
  },
  {
    label: t('laboratories.list.filters.investor'),
    value: SellerType.INVESTOR
  }
]

export const amenitiesOptions = [
  { label: t('laboratories.list.filters.garage'), value: 'garage' },
  { label: t('laboratories.list.filters.garden'), value: 'garden' },
  { label: t('laboratories.list.filters.pool'), value: 'pool' },
  { label: t('laboratories.list.filters.elevator'), value: 'elevator' },
  { label: t('laboratories.list.filters.terrace'), value: 'terrace' }
]

export const sortByOptions = [
  { label: t('laboratories.list.mostRelevant'), value: 'mostRelevant' },
  { label: t('laboratories.list.priceLowToHigh'), value: 'priceLowToHigh' },
  { label: t('laboratories.list.priceHighToLow'), value: 'priceHighToLow' },
  { label: t('laboratories.list.newest'), value: 'newest' }
]

function localizeFilterArray(value: string[]) {
  return value.map((v) => t(`laboratories.list.filters.${v}`)).join(', ')
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

function getActiveFilters(filters: IlaboratoryFilters) {
  const activeFilters = Object.entries(filters).filter(([, value]) => {
    return Array.isArray(value) ? value.length > 0 : !!value
  })

  return activeFilters
}

function formatActiveFilters(filters: IlaboratoryFilters, maxFilters: number = 6): string[] {
  const keysToBeExcluded = ['title', 'sortBy']
  const activeFilters = getActiveFilters(filters).filter(([key]) => !keysToBeExcluded.includes(key))

  const formattedFilters = activeFilters.map(([key, value]) => {
    const formatter = formatMap[key] || ((v: any) => v)
    return `${t(`laboratories.list.filters.${key}`)}: ${formatter(value)}`
  })

  if (formattedFilters.length > maxFilters) {
    formattedFilters.splice(maxFilters, formattedFilters.length - maxFilters, '...')
  }

  return formattedFilters
}

export default {
  laboratoryTypesOptions,
  sellerTypesOptions,
  amenitiesOptions,
  sortByOptions,
  getActiveFilters,
  formatActiveFilters
}
