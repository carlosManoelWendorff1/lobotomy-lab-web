import '@/assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import i18n from '@/plugins/i18n'
import primeVue from '@/plugins/prime-vue'
import yup from '@/plugins/yup'
import globalComponents from '@/plugins/global-components'
import gatewayProvider from '@/plugins/gateway-provider'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(primeVue)
app.use(yup)
app.use(globalComponents)
app.use(gatewayProvider)

app.mount('#app')
