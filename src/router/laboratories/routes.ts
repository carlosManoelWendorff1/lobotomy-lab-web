import requireAuthentication from '@/middlewares/requireAuthentication'
import type { RouteRecordRaw } from 'vue-router'

const laboratoriesRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/laboratories',
    name: 'laboratories-list',
    component: () => import('@/views/laboratories/LaboratoryList.vue'),
    meta: {
      title: 'laboratories'
    }
  },
  {
    path: '/laboratories/advertise',
    name: 'laboratory-advertise',
    component: () => import('@/views/laboratories/LaboratoryCreate.vue'),
    meta: {
      title: 'Advertise',
      middleware: [requireAuthentication]
    }
  },
  {
    path: '/laboratories/details/:id',
    name: 'laboratory-details',
    component: () => import('@/views/laboratories/LaboratoryDetails.vue'),
    props: true,
    meta: {
      title: 'Details'
    }
  }
]

export default laboratoriesRoutes
