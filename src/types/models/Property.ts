import type Location from '@/types/models/Location'
import type Seller from '@/types/models/Seller'

export default class Property {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public size: number,
    public bedrooms: number,
    public bathrooms: number,
    public type: string,
    public amenities: string[],
    public availability: string,
    public imageSources: string[],
    public location: Location,
    public seller: Seller,
    public id?: string
  ) {}
}
