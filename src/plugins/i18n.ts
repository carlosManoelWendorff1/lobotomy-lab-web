import { createI18n } from 'vue-i18n'

import ptBR from '@/locales/pt-BR.json'
import enUS from '@/locales/en-US.json'

type MessageSchema = typeof enUS

const i18n = createI18n<[MessageSchema], 'en-US' | 'pt-BR'>({
  legacy: false,
  locale: localStorage.getItem('locale') || navigator.language,
  fallbackLocale: 'en',
  warnHtmlInMessage: 'off',
  messages: {
    'pt-BR': ptBR,
    'en-US': enUS
  },
  numberFormats: {
    'en-US': {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    'pt-BR': {
      currency: {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'code'
      }
    }
  }
})

export default i18n
