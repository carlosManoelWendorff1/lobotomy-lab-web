import { createRouter, createWebHistory } from 'vue-router'
import propertiesRoutes from '@/router/properties/routes'
import middlewarePipeline, {
  type MiddlewareContext,
  type MiddlewareFunction
} from '@/middlewares/middlewarePipeline'
import redirectAuthenticated from '@/middlewares/redirectAuthenticated'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/BaseLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Home.vue'),
          meta: {
            title: 'Home'
          }
        },
        {
          path: '/security',
          name: 'security',
          component: () => import('@/views/Security.vue'),
          meta: {
            title: 'Security'
          }
        },
        ...propertiesRoutes
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login',
        middleware: [redirectAuthenticated]
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: 'Register',
        middleware: [redirectAuthenticated]
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/layouts/NotFound.vue')
    },
    {
      path: '/not-found/:resource',
      name: 'resource-not-found',
      component: () => import('@/layouts/NotFound.vue'),
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: () => import('@/layouts/NetworkError.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const appName = import.meta.env.VITE_APP_NAME
  document.title = to.meta.title ? `${to.meta.title} | ${appName}` : appName

  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware as MiddlewareFunction[]
  const context = { to, from, next } as MiddlewareContext

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
