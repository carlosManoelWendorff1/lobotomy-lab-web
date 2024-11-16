import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import i18n from '@/plugins/i18n'

type Theme = 'light' | 'dark'

type ThemeOption = {
  label: string
  value: Theme
}

export default function useTheme() {
  const selectedTheme = useStorage<Theme>('theme', 'light')
  const isLight = ref(selectedTheme.value === 'light')

  const root = document.getElementsByTagName('html')[0]

  const themesOptions = ref<ThemeOption[]>([
    { label: i18n.global.t('settings.light'), value: 'light' },
    { label: i18n.global.t('settings.dark'), value: 'dark' }
  ])

  function toggleTheme() {
    if (selectedTheme.value === 'dark') {
      setDark()
    } else {
      setLight()
    }
  }

  function setDark() {
    root.classList.add('dark')
    selectedTheme.value = 'dark'
    isLight.value = false
  }

  function setLight() {
    root.classList.remove('dark')
    selectedTheme.value = 'light'
    isLight.value = true
  }

  return {
    selectedTheme,
    themesOptions,
    isLight,
    toggleTheme
  }
}
