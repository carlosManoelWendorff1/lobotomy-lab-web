import { useUserStore } from '@/stores/user'
import type { MiddlewareContext } from '@/middlewares/middlewarePipeline'

function requireAuthentication({ next }: MiddlewareContext) {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    return next({ name: 'login' })
  }

  return next()
}

export default requireAuthentication
