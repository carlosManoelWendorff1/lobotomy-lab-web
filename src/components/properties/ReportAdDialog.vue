<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useField, useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import BaseDialog from '@/components/wrappers/misc/BaseDialog.vue'
import BaseInputTextarea from '@/components/wrappers/form/BaseInputTextarea.vue'

const { t } = useI18n()

const validationSchema = object({
  name: string().required().min(5).max(100),
  email: string().required().email(),
  description: string().required().min(30),
  dataSharingConsent: boolean().required()
})

const { handleSubmit, errors } = useForm({ validationSchema })
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: description } = useField('description')
const { value: dataSharingConsent } = useField('dataSharingConsent')

const sendReport = handleSubmit(() => {
  // Send report
})

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
  <BaseDialog v-bind="$attrs" v-model:visible="isVisible" class="w-9 md:w-6 xl:w-3">
    <template #header>
      <div class="header">
        <h2>{{ $t('properties.reportAd') }}</h2>
        <p>{{ $t('properties.reportAdIrregularitiesPrompt') }}</p>
      </div>
    </template>
    <div class="grid">
      <div class="col-12">
        <BaseInputText
          v-model="name"
          :label="t('fields.name')"
          :placeholder="t('fields.name')"
          :error="errors.name"
        />
      </div>
      <div class="col-12">
        <BaseInputText
          v-model="email"
          :label="t('fields.email')"
          :placeholder="t('fields.email')"
          :error="errors.email"
        />
      </div>
      <div class="col-12">
        <BaseInputTextarea
          v-model="description"
          :label="t('fields.description')"
          :placeholder="t('properties.reportDescriptionPlaceholder')"
          :error="errors.description"
          rows="4"
        />
      </div>
      <div class="col-12 flex gap-2">
        <BaseCheckbox
          v-model="dataSharingConsent"
          :label="$t('properties.dataSharingConsent')"
          :error="errors.dataSharingConsent"
          :value="false"
        />
      </div>
      <div class="col-12">
        <BaseButton label="Send" class="w-full" @click="sendReport" />
      </div>
    </div>
  </BaseDialog>
</template>

<style scoped>
.header h2,
.header p {
  margin: 0.25rem;
}
</style>
