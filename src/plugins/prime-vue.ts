import type { App } from 'vue'

import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
})

const primeVue = {
  install(app: App<Element>) {
    app.use(PrimeVue, {
      ripple: true,
      theme: {
        preset,
        options: {
          prefix: '',
          darkModeSelector: '.dark',
          cssLayer: false
        }
      }
    })
    app.use(ToastService)
  }
}

export default primeVue
