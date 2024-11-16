import type { App } from 'vue'
import AxiosAdapter from '@/gateways/httpClient'
import laboratoryGateway, {
  laboratoryGatewayInMemory,
  type ILaboratoryGateway
} from '@/gateways/LaboratoryGateway'
import LocationGateway, {
  type ILocationGateway,
  LocationGatewayInMemory
} from '@/gateways/LocationGateway'
import UserGateway, { UserGatewayInMemory, type IUserGateway } from '@/gateways/UserGateway'

const createHttpGateways = () => ({
  laboratoryGateway: new laboratoryGateway(new AxiosAdapter()),
  locationGateway: new LocationGateway(new AxiosAdapter()),
  userGateway: new UserGateway(new AxiosAdapter())
})

const createInMemoryGateways = () => ({
  laboratoryGateway: new laboratoryGatewayInMemory(),
  locationGateway: new LocationGatewayInMemory(),
  userGateway: new UserGatewayInMemory()
})

const installGateways = (
  app: App,
  gateways: {
    laboratoryGateway: ILaboratoryGateway
    locationGateway: ILocationGateway
    userGateway: IUserGateway
  }
) => {
  app.provide<ILaboratoryGateway>('laboratoryGateway', gateways.laboratoryGateway)
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
