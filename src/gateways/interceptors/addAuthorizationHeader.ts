import type { InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'

function addAuthorizationHeader(config: InternalAxiosRequestConfig) {
  const userStore = useUserStore()
  const urlsExcludedForBearerHeader = ['/login', '/register']
  if (urlsExcludedForBearerHeader.indexOf(config.url!) === -1) {
    config.headers.Authorization = `Bearer ${userStore.user?.accessToken}`
  }
  return config
}

export default addAuthorizationHeader
