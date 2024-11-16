import type IHttpClient from './httpClient'
import type Laboratory from '@/types/models/Laboratory'
import type ILaboratoryFilters from '@/types/laboratoryFilters'
import { properties as mockLaboratories } from '@/data/laboratories.json'

export interface ILaboratoryGateway {
  getAll(filters: ILaboratoryFilters): Promise<Laboratory[]>
  getById(id: string): Promise<Laboratory>
  save(laboratory: Laboratory): Promise<void>
  remove(id: string): Promise<void>
}

export default class laboratoryGateway implements ILaboratoryGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getAll(filters: ILaboratoryFilters): Promise<Laboratory[]> {
    const urlParams = new URLSearchParams()

    for (const key in filters) {
      const value = filters[key as keyof ILaboratoryFilters]
      if (!value) continue
      if (Array.isArray(value)) {
        value.forEach((item: string) => urlParams.append(key, item))
      } else {
        urlParams.append(key, value as string)
      }
    }

    return await this.httpClient.get(`/laboratories?${urlParams}`)
  }

  async getById(id: string): Promise<Laboratory> {
    return await this.httpClient.get(`/laboratories/${id}`)
  }

  async save(laboratory: Laboratory): Promise<void> {
    const method = laboratory.id ? 'put' : 'post'
    return await this.httpClient[method]('/laboratories', laboratory)
  }

  async remove(id: string): Promise<void> {
    return await this.httpClient.delete(`/laboratories/${id}`)
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class laboratoryGatewayInMemory implements ILaboratoryGateway {
  private laboratories: Laboratory[] = mockLaboratories

  async getAll(filters: ILaboratoryFilters): Promise<Laboratory[]> {
    await delay(1500)
    const { title, location } = filters
    return this.laboratories.filter(
      (laboratory) =>
        (!title || laboratory.title.includes(title)) &&
        (!location ||
          laboratory.location.city === location ||
          laboratory.location.state === location)
    )
  }

  async getById(id: string): Promise<Laboratory> {
    await delay(1500)
    const laboratory = this.laboratories.find((laboratory) => laboratory.id === id)
    if (!laboratory) throw new Error('laboratory not found')
    return laboratory
  }

  async save(laboratory: Laboratory): Promise<void> {
    await delay(1500)
    const index = this.laboratories.findIndex((p) => p.id === laboratory.id)
    if (index === -1) {
      laboratory.id = String(this.laboratories.length + 1)
      this.laboratories.push(laboratory)
    } else {
      this.laboratories[index] = laboratory
    }
  }

  async remove(id: string): Promise<void> {
    this.laboratories = this.laboratories.filter((laboratory) => laboratory.id !== id)
  }
}
