import type IHttpClient from './httpClient'
import type Property from '@/types/models/Property'
import type IPropertyFilters from '@/types/propertyFilters'
import { properties as mockProperties } from '@/data/properties.json'

export interface IPropertyGateway {
  getAll(filters: IPropertyFilters): Promise<Property[]>
  getById(id: string): Promise<Property>
  save(property: Property): Promise<void>
  remove(id: string): Promise<void>
}

export default class PropertyGateway implements IPropertyGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getAll(filters: IPropertyFilters): Promise<Property[]> {
    const urlParams = new URLSearchParams()

    for (const key in filters) {
      const value = filters[key as keyof IPropertyFilters]
      if (!value) continue
      if (Array.isArray(value)) {
        value.forEach((item: string) => urlParams.append(key, item))
      } else {
        urlParams.append(key, value as string)
      }
    }

    return await this.httpClient.get(`/properties?${urlParams}`)
  }

  async getById(id: string): Promise<Property> {
    return await this.httpClient.get(`/properties/${id}`)
  }

  async save(property: Property): Promise<void> {
    const method = property.id ? 'put' : 'post'
    return await this.httpClient[method]('/properties', property)
  }

  async remove(id: string): Promise<void> {
    return await this.httpClient.delete(`/properties/${id}`)
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class PropertyGatewayInMemory implements IPropertyGateway {
  private properties: Property[] = mockProperties

  async getAll(filters: IPropertyFilters): Promise<Property[]> {
    await delay(1500)
    const { title, location } = filters
    return this.properties.filter(
      (property) =>
        (!title || property.title.includes(title)) &&
        (!location || property.location.city === location || property.location.state === location)
    )
  }

  async getById(id: string): Promise<Property> {
    await delay(1500)
    const property = this.properties.find((property) => property.id === id)
    if (!property) throw new Error('Property not found')
    return property
  }

  async save(property: Property): Promise<void> {
    await delay(1500)
    const index = this.properties.findIndex((p) => p.id === property.id)
    if (index === -1) {
      property.id = String(this.properties.length + 1)
      this.properties.push(property)
    } else {
      this.properties[index] = property
    }
  }

  async remove(id: string): Promise<void> {
    this.properties = this.properties.filter((property) => property.id !== id)
  }
}
