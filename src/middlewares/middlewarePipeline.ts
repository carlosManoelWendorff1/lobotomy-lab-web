import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export type MiddlewareContext = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: NavigationGuardNext
}

export type MiddlewareFunction = (context: MiddlewareContext) => void

function middlewarePipeline(
  context: MiddlewareContext,
  middleware: MiddlewareFunction[],
  index: number
): NavigationGuardNext {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context.next
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1)
    nextMiddleware({ ...context, next: nextPipeline })
  }
}

export default middlewarePipeline
