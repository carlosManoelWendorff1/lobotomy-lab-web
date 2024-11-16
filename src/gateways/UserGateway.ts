import type IHttpClient from './httpClient'
import User from '@/types/models/User'
import { users as mockUsers } from '@/data/users.json'

export interface IUserGateway {
  register(registrationData: RegistrationRequest): Promise<void>
  login(loginData: LoginRequest): Promise<User>
}

export type RegistrationRequest = {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginRequest = {
  email: string
  password: string
}

export default class UserGateway implements IUserGateway {
  constructor(readonly httpClient: IHttpClient) {}

  async register(registrationData: RegistrationRequest): Promise<void> {
    return await this.httpClient.post('/register', registrationData)
  }

  async login(loginData: LoginRequest): Promise<User> {
    return await this.httpClient.post('/login', loginData)
  }
}

export class UserGatewayInMemory implements IUserGateway {
  private users: User[] = mockUsers

  async register({ fullName, email, password }: RegistrationRequest): Promise<void> {
    if (this.users.find((user) => user.email === email)) {
      throw new Error('User already exists')
    }
    const user = new User(fullName, email, '', '', password, String(this.users.length + 1))
    this.users.push(user)
  }

  async login({ email, password }: LoginRequest): Promise<User> {
    const user = this.users.find((user) => user.email === email && user.password === password)
    if (!user) throw new Error('Invalid credentials')
    return user
  }
}
