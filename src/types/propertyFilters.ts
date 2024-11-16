import type { SellerType } from '@/types/enums/SellerType'

export default interface IPropertyFilters {
  title?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  minYearBuilt?: number
  maxYearBuilt?: number
  minSize?: number
  maxSize?: number
  minBedrooms?: number
  minBathrooms?: number
  sellerTypes?: SellerType[]
  sortBy?: string
  amenities?: string[]
}
