<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import BaseDialog from '@/components/wrappers/misc/BaseDialog.vue'
import BaseSelect from '@/components/wrappers/form/BaseSelect.vue'
import useBaseToast from '@/composables/useBaseToast'
import useTheme from '@/composables/useTheme'

const i18n = useI18n()
const toast = useBaseToast()

const { selectedTheme, themesOptions, toggleTheme } = useTheme()
const { selectedLocale, localesOptions, toggleLocale, getLocaleOption } = useLocale()

function useLocale() {
  type Locale = 'en-US' | 'pt-BR'

  type LanguageOption = {
    label: string
    value: Locale
    icon: string
  }

  const selectedLocale = useStorage<Locale>('locale', 'en-US')

  const localesOptions = ref<LanguageOption[]>([
    {
      label: i18n.t('settings.english'),
      value: 'en-US',
      icon: 'https://flagsapi.com/GB/flat/24.png'
    },
    {
      label: i18n.t('settings.portuguese'),
      value: 'pt-BR',
      icon: 'https://flagsapi.com/BR/flat/24.png'
    }
  ])

  function toggleLocale(): void {
    i18n.locale.value = selectedLocale.value
  }

  function getLocaleOption(locale: Locale): LanguageOption {
    return localesOptions.value.find((option) => option.value === locale)!
  }

  return {
    selectedLocale,
    localesOptions,
    getLocaleOption,
    toggleLocale
  }
}

function saveChanges() {
  toggleLocale()
  toggleTheme()
  closeDialog()
  toast.success({ message: i18n.t('settings.messages.settingsSaved') })
}

const isVisible = ref(false)

function openDialog() {
  isVisible.value = true
}

function closeDialog() {
  isVisible.value = false
}

defineExpose({
  openDialog,
  closeDialog
})
</script>

<template>
  <BaseDialog v-bind="$attrs" v-model:visible="isVisible" class="w-8 md:w-4 xl:w-2">
    <template #header>
      <div class="header">
        <h2>{{ $t('common.settings') }}</h2>
      </div>
    </template>
    <form class="grid" @submit.prevent="saveChanges">
      <div class="col-12">
        <BaseSelect
          v-model="selectedLocale"
          :label="$t('settings.language')"
          :placeholder="$t('settings.selectLanguage')"
          :options="localesOptions"
          option-label="label"
          option-value="value"
        >
          <template #option="{ option }">
            <span class="flex align-items-center gap-2">
              <img :alt="option.label" :src="option.icon" />
              <span>{{ option.label }}</span>
            </span>
          </template>

          <template #value="{ value, placeholder }">
            <div v-if="value">
              <span class="flex align-items-center gap-2">
                <img :alt="getLocaleOption(value).label" :src="getLocaleOption(value).icon" />
                <span>{{ getLocaleOption(value).label }}</span>
              </span>
            </div>
            <div v-else>
              <span>{{ placeholder }}</span>
            </div>
          </template>
        </BaseSelect>
      </div>
      <div class="col-12">
        <BaseSelect
          v-model="selectedTheme"
          :label="$t('settings.theme')"
          :placeholder="$t('settings.selectTheme')"
          :options="themesOptions"
          option-label="label"
          option-value="value"
        />
      </div>
      <div class="col-12 text-right">
        <BaseButton
          type="submit"
          icon="pi pi-check"
          class="w-6 mt-4 xl:w-5"
          :label="$t('common.save')"
        />
      </div>
    </form>
  </BaseDialog>
</template>

<style scoped>
.header h2 {
  margin: 0.25rem;
}
</style>
