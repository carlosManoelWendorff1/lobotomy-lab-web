<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useField, useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import BaseInputTextarea from '@/components/wrappers/form/BaseInputTextarea.vue'
import ReportAdDialog from '@/components/properties/ReportAdDialog.vue'

withDefaults(defineProps<{ price: number }>(), {
  price: 0
})

const { t } = useI18n()
const reportAdDialogRef = ref<InstanceType<typeof ReportAdDialog> | null>(null)

const validationSchema = object({
  name: string().required().min(5).max(100),
  email: string().required().email(),
  phone: string().required().min(10).max(16),
  message: string().required().min(20),
  receiveContacts: boolean().required()
})

const { handleSubmit, errors, setFieldValue } = useForm({ validationSchema })
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: phone } = useField('phone')
const { value: message } = useField('message')
const { value: receiveContacts } = useField('receiveContacts')

const sendMessageToSeller = handleSubmit((values) => {
  const phoneNumber = '5511999999999'
  const encodedMessage = encodeURIComponent(values.message)
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  window.open(whatsappURL, '_blank')
})

onBeforeMount(() => {
  setFieldValue('message', t('properties.interestedInRealEstateContactMe'))
})
</script>

<template>
  <div class="property-contact-form">
    <BaseCard>
      <template #title>
        <span class="text-4xl">{{ $n(price, 'currency') }}</span>
      </template>
      <template #subtitle> {{ $t('properties.sendMessageToSeller') }} </template>
      <template #content>
        <div class="grid">
          <div class="col-12">
            <BaseInputText
              v-model="name"
              :label="$t('fields.name')"
              :placeholder="$t('fields.name')"
              :error="errors.name"
            />
          </div>
          <div class="col-12">
            <BaseInputText
              v-model="email"
              :label="$t('fields.email')"
              :placeholder="$t('fields.email')"
              :error="errors.email"
            />
          </div>
          <div class="col-12">
            <BaseInputMask
              v-model="phone"
              :label="t('fields.phone')"
              :placeholder="t('fields.phone')"
              :error="errors.phone"
              mask="(99) 9 9999-9999"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseInputTextarea
              v-model="message as string"
              :label="t('fields.message')"
              :placeholder="t('fields.message')"
              :error="errors.message"
              rows="4"
            />
          </div>
          <div class="col-12 flex gap-2">
            <BaseCheckbox
              v-model="receiveContacts"
              :label="$t('properties.receiveContactsFromRealEstate')"
              :value="false"
              :error="errors.receiveContacts"
            />
          </div>
          <div class="col-12">
            <BaseButton label="Send" class="w-full" @click="sendMessageToSeller" />
          </div>
        </div>
      </template>
    </BaseCard>
    <div class="report-ad">
      <p class="report-ad__title" @click="reportAdDialogRef?.openDialog">
        <i class="pi pi-flag" style="font-size: 0.875rem" />
        {{ $t('properties.reportThisAd') }}
      </p>
    </div>
    <ReportAdDialog ref="reportAdDialogRef" />
  </div>
</template>

<style scoped>
.property-contact-form {
  width: 32%;
}
.report-ad {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
.report-ad__title {
  font-size: 0.875rem;
  color: var(--gray-500);
  cursor: pointer;
}
.report-ad__title:hover {
  text-decoration: underline;
}
@media (max-width: 1300px) {
  .property-contact-form {
    width: 100%;
  }
}
</style>
