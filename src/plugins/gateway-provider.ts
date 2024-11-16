import type { App } from 'vue'
import AxiosAdapter from '@/gateways/httpClient'
import PropertyGateway, {
  PropertyGatewayInMemory,
  type IPropertyGateway
} from '@/gateways/PropertyGateway'
import LocationGateway, {
  type ILocationGateway,
  LocationGatewayInMemory
} from '@/gateways/LocationGateway'
import UserGateway, { UserGatewayInMemory, type IUserGateway } from '@/gateways/UserGateway'

const createHttpGateways = () => ({
  propertyGateway: new PropertyGateway(new AxiosAdapter()),
  locationGateway: new LocationGateway(new AxiosAdapter()),
  userGateway: new UserGateway(new AxiosAdapter())
})

const createInMemoryGateways = () => ({
  propertyGateway: new PropertyGatewayInMemory(),
  locationGateway: new LocationGatewayInMemory(),
  userGateway: new UserGatewayInMemory()
})

const installGateways = (
  app: App,
  gateways: {
    propertyGateway: IPropertyGateway
    locationGateway: ILocationGateway
    userGateway: IUserGateway
  }
) => {
  app.provide<IPropertyGateway>('propertyGateway', gateways.propertyGateway)
  app.provide<ILocationGateway>('locationGateway', gateways.locationGateway)
  app.provide<IUserGateway>('userGateway', gateways.userGateway)
}

const gatewaysHttp = {
  install(app: App) {
    const gateways = createHttpGateways()
    installGateways(app, gateways)
  }
}

const gatewaysInMemory = {
  install(app: App) {
    const gateways = createInMemoryGateways()
    installGateways(app, gateways)
  }
}

const gatewayProvider = import.meta.env.VITE_API_URL ? gatewaysHttp : gatewaysInMemory

export default gatewayProvider
