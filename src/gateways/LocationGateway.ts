import type IHttpClient from './httpClient'
import Location from '@/types/models/Location'
import { locations as mockLocations } from '@/data/locations.json'

export interface ILocationGateway {
  getByZipCode(zipCode: string): Promise<Location>
}

export default class LocationGateway implements ILocationGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async getByZipCode(zipCode: string): Promise<Location> {
    return await this.httpClient.get(`/locations?zipCode=${zipCode}`)
  }
}

export class LocationGatewayInMemory implements ILocationGateway {
  locations: Location[] = mockLocations

  async getByZipCode(zipCode: string): Promise<Location> {
    return this.locations.find((location) => location.zipCode === zipCode)!
  }
}
