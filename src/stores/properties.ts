import { acceptHMRUpdate, defineStore } from 'pinia'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '@/plugins/i18n'
import useBaseToast from '@/composables/useBaseToast'
import type Property from '@/types/models/Property'
import type IPropertyFilters from '@/types/propertyFilters'
import type { IPropertyGateway } from '@/gateways/PropertyGateway'

export const usePropertiesStore = defineStore('properties', () => {
  const propertyGateway = inject<IPropertyGateway>('propertyGateway')!
  const toast = useBaseToast()
  const router = useRouter()

  const isLoading = ref(false)
  const property = ref<Property | null>(null)
  const properties = ref<Property[]>([])

  async function createProperty(property: Property) {
    isLoading.value = true
    try {
      await propertyGateway.save(property)
      toast.success({ message: i18n.global.t('properties.form.messages.propertyCreated') })
      router.push({ name: 'properties-list' })
    } catch {
      toast.error({ message: i18n.global.t('properties.form.messages.errorSavingProperty') })
    } finally {
      isLoading.value = false
    }
  }

  async function getPropertyById(id: string) {
    isLoading.value = true
    try {
      property.value = null
      property.value = await propertyGateway.getById(id)
    } catch {
      router.push({
        name: 'resource-not-found',
        params: { resource: i18n.global.t('common.property') }
      })
    } finally {
      isLoading.value = false
    }
  }

  async function getAllProperties(filters: IPropertyFilters = {}) {
    isLoading.value = true
    try {
      properties.value = await propertyGateway.getAll(filters)
    } catch {
      toast.error({ message: i18n.global.t('properties.list.messages.errorFetchingProperties') })
    } finally {
      isLoading.value = false
    }
  }

  return {
    /* State */
    isLoading,
    property,
    properties,
    /* Actions */
    createProperty,
    getPropertyById,
    getAllProperties
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePropertiesStore, import.meta.hot))
}
