import { useUserStore } from '@/stores/user'
import type { MiddlewareContext } from '@/middlewares/middlewarePipeline'

/**
 * Middleware to redirect authenticated users away from authentication pages (e.g., login, register).
 *
 * @param {MiddlewareContext} context - The middleware context containing routing information.
 * @param {Object} context.to - The target route object being navigated to.
 * @param {Function} context.next - The function to call to proceed to the next step in the navigation pipeline.
 */
function redirectAuthenticated({ next }: MiddlewareContext) {
  const userStore = useUserStore()

  if (userStore.isLoggedIn) {
    return next({ name: 'home' })
  }

  return next()
}

export default redirectAuthenticated
