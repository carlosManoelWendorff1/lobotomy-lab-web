<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { inject } from 'vue'
import { useField, useForm } from 'vee-validate'
import { object, string, number, array } from 'yup'
import { amenitiesOptions, propertyTypesOptions } from '@/utils/propertiesResolver'
import { usePropertiesStore } from '@/stores/properties'
import { useDebounceFn } from '@vueuse/core'
import useBaseToast from '@/composables/useBaseToast'
import BaseInlineMessage from '@/components/wrappers/form/BaseInlineMessage.vue'
import BaseSelect from '@/components/wrappers/form/BaseSelect.vue'
import BaseChips from '@/components/wrappers/form/BaseChips.vue'
import type Property from '@/types/models/Property'
import type { ILocationGateway } from '@/gateways/LocationGateway'

const locationGateway = inject<ILocationGateway>('locationGateway')!

const toast = useBaseToast()
const propertiesStore = usePropertiesStore()
const { t } = useI18n()

const validationSchema = object({
  title: string().required().min(5).max(100),
  description: string().required().min(20),
  price: number().required().positive().max(10000000),
  size: number().required().positive().max(100000),
  imageSources: array().required().min(1).of(string().url()),
  type: string().required().oneOf(['house', 'apartment']),
  bedrooms: number().required().integer().min(0).max(50),
  bathrooms: number().required().integer().min(0).max(50),
  amenities: array().required().min(1).of(string()),
  availability: string().required(),
  location: object({
    zipCode: string()
      .required()
      .matches(/^\d{5}-\d{3}$/),
    address: string().required().min(5),
    city: string()
      .required()
      .matches(/^[a-zA-Z\sá]+$/)
      .min(2),
    state: string().required().length(2),
    country: string()
      .required()
      .matches(/^[a-zA-Z\s]+$/)
      .min(2)
  }).required()
})

const { handleSubmit, errors, setFieldValue } = useForm({ validationSchema })
const { value: title } = useField('title')
const { value: description } = useField('description')
const { value: price } = useField('price')
const { value: size } = useField('size')
const { value: imageSources } = useField('imageSources')
const { value: type } = useField('type')
const { value: bedrooms } = useField('bedrooms')
const { value: bathrooms } = useField('bathrooms')
const { value: amenities } = useField('amenities')
const { value: availability } = useField('availability')
const { value: zipCode } = useField('location.zipCode')
const { value: address } = useField('location.address')
const { value: city } = useField('location.city')
const { value: state } = useField('location.state')
const { value: country } = useField('location.country')

const onSubmit = handleSubmit(async (property) => {
  await propertiesStore.createProperty(property as Property)
})

const getLocationByZipCode = useDebounceFn(async () => {
  try {
    const location = await locationGateway.getByZipCode(zipCode.value as string)
    setFieldValue('location', location)
    toast.success({ message: t('properties.form.messages.locationFound') })
  } catch {
    toast.error({ message: t('properties.form.messages.locationNotFound') })
  }
}, 1000)
</script>

<template>
  <div class="form-container">
    <h1 data-testid="title" class="mb-0">{{ $t('properties.form.title') }}</h1>
    <p data-testid="subtitle" class="mb-4">{{ $t('properties.form.subtitle') }}</p>
    <form @submit.prevent="onSubmit">
      <div class="grid">
        <div class="col-12 md:col-6">
          <BaseInputText
            v-model="title"
            :error="errors.title"
            :label="$t('fields.title')"
            :placeholder="$t('fields.title')"
          />
        </div>
        <div class="col-12 md:col-6">
          <BaseInputText
            v-model="description"
            :error="errors.description"
            :label="$t('fields.description')"
            :placeholder="$t('fields.description')"
          />
        </div>

        <div class="col-12 md:col-3">
          <BaseInputNumber
            v-model="price"
            :error="errors.price"
            mode="currency"
            currency="USD"
            locale="en-US"
            :label="$t('fields.price')"
            :placeholder="$t('fields.price')"
            class="w-full"
          />
        </div>
        <div class="col-12 md:col-3">
          <BaseInputNumber
            v-model="size"
            :error="errors.size"
            :label="$t('fields.size')"
            :placeholder="$t('fields.size')"
            suffix="m²"
            class="w-full"
          />
        </div>
        <div class="col-12 md:col-6">
          <BaseMultiSelect
            v-model="amenities"
            :error="errors.amenities"
            :label="$t('fields.amenities')"
            :placeholder="$t('fields.amenities')"
            :options="amenitiesOptions"
            option-label="label"
            option-value="value"
          />
        </div>

        <div class="col-12">
          <BaseChips
            v-model="imageSources"
            :error="errors.imageSources"
            :label="$t('fields.imageSources')"
            :placeholder="$t('fields.imageSources')"
            class="w-full"
          />
        </div>

        <div class="col-12 md:col-3">
          <BaseSelect
            v-model="type"
            :error="errors.type"
            :label="$t('fields.type')"
            :placeholder="$t('fields.type')"
            :options="propertyTypesOptions"
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="col-12 md:col-2">
          <BaseInputNumber
            v-model="bedrooms"
            :error="errors.bedrooms"
            :label="$t('fields.bedrooms')"
            :placeholder="$t('fields.bedrooms')"
            class="w-full"
          />
        </div>
        <div class="col-12 md:col-2">
          <BaseInputNumber
            v-model="bathrooms"
            :error="errors.bathrooms"
            :label="$t('fields.bathrooms')"
            :placeholder="$t('fields.bathrooms')"
            class="w-full"
          />
        </div>
        <div class="col-12 md:col-5">
          <BaseInputText
            v-model="availability"
            :error="errors.availability"
            :label="$t('fields.availability')"
            :placeholder="$t('fields.availability')"
          />
        </div>

        <div class="col-12 md:col-2">
          <BaseInputMask
            v-model="zipCode"
            :label="$t('fields.location.zipCode')"
            :placeholder="$t('fields.location.zipCode')"
            :error="errors['location.zipCode']"
            mask="99999-999"
            @change="getLocationByZipCode"
          />
        </div>
        <div class="col-12 md:col-3">
          <BaseInputText
            v-model="address"
            :label="$t('fields.location.address')"
            :placeholder="$t('fields.location.address')"
            :error="errors['location.address']"
          />
        </div>
        <div class="col-12 md:col-3">
          <BaseInputText
            v-model="city"
            :label="$t('fields.location.city')"
            :placeholder="$t('fields.location.city')"
            :error="errors['location.city']"
          />
        </div>
        <div class="col-12 md:col-2">
          <BaseInputText
            v-model="state"
            :label="$t('fields.location.state')"
            :placeholder="$t('fields.location.state')"
            :error="errors['location.state']"
          />
        </div>
        <div class="col-12 md:col-2">
          <BaseInputText
            v-model="country"
            :label="$t('fields.location.country')"
            :placeholder="$t('fields.location.country')"
            :error="errors['location.country']"
          />
        </div>

        <div class="col-12 mt-4">
          <BaseInlineMessage
            severity="info"
            :text="$t('properties.form.propertyDataEditRestriction')"
          />
        </div>

        <div class="col-12 text-right">
          <BaseButton
            type="submit"
            icon="pi pi-check"
            class="w-6 mt-4 md:w-3"
            :label="$t('common.save')"
            :loading="propertiesStore.isLoading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--content-background);
  border-radius: 0.5rem;
  padding: 2rem;
}
</style>

<style>
.p-menuitem-link {
  background-color: var(--secondary-color) !important;
}
</style>
