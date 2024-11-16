import requireAuthentication from '@/middlewares/requireAuthentication'
import type { RouteRecordRaw } from 'vue-router'

const propertiesRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/properties',
    name: 'properties-list',
    component: () => import('@/views/properties/PropertyList.vue'),
    meta: {
      title: 'Properties'
    }
  },
  {
    path: '/properties/advertise',
    name: 'property-advertise',
    component: () => import('@/views/properties/PropertyCreate.vue'),
    meta: {
      title: 'Advertise',
      middleware: [requireAuthentication]
    }
  },
  {
    path: '/properties/details/:id',
    name: 'property-details',
    component: () => import('@/views/properties/PropertyDetails.vue'),
    props: true,
    meta: {
      title: 'Details'
    }
  }
]

export default propertiesRoutes
