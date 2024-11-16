import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import addAuthorizationHeader from '@/gateways/interceptors/addAuthorizationHeader'
import handleApiError from '@/gateways/interceptors/handleApiError'

type RequestConfig = AxiosRequestConfig

export default interface IHttpClient {
  get(url: string, config?: RequestConfig): Promise<any>
  post(url: string, data?: any, config?: RequestConfig): Promise<any>
  put(url: string, data?: any, config?: RequestConfig): Promise<any>
  delete(url: string, config?: RequestConfig): Promise<any>
}

export default class AxiosAdapter implements IHttpClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({ baseURL: import.meta.env.VITE_API_URL })
    this.instance.interceptors.request.use(addAuthorizationHeader)
    this.instance.interceptors.response.use(undefined, handleApiError)
  }

  async get(url: string, config?: RequestConfig): Promise<any> {
    const response = await this.instance.get(url, config)
    return response.data
  }

  async post(url: string, data?: any, config?: RequestConfig): Promise<any> {
    const response = await this.instance.post(url, data, config)
    return response.data
  }

  async put(url: string, data?: any, config?: RequestConfig): Promise<any> {
    const response = await this.instance.put(url, data, config)
    return response.data
  }

  async delete(url: string, config?: RequestConfig): Promise<any> {
    const response = await this.instance.delete(url, config)
    return response.data
  }
}
