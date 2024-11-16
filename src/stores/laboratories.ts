import { acceptHMRUpdate, defineStore } from 'pinia'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import i18n from '@/plugins/i18n'
import useBaseToast from '@/composables/useBaseToast'
import type Laboratory from '@/types/models/Laboratory'
import type ILaboratoryFilters from '@/types/laboratoryFilters'
import type { ILaboratoryGateway } from '@/gateways/LaboratoryGateway'

export const useLaboratoriesStore = defineStore('laboratories', () => {
  const laboratoryGateway = inject<ILaboratoryGateway>('laboratoryGateway')!
  const toast = useBaseToast()
  const router = useRouter()

  const isLoading = ref(false)
  const laboratory = ref<Laboratory | null>(null)
  const laboratories = ref<Laboratory[]>([])

  async function createLaboratory(laboratory: Laboratory) {
    isLoading.value = true
    try {
      await laboratoryGateway.save(laboratory)
      toast.success({ message: i18n.global.t('laboratories.form.messages.laboratoryCreated') })
      router.push({ name: 'laboratories-list' })
    } catch {
      toast.error({ message: i18n.global.t('laboratories.form.messages.errorSavingLaboratory') })
    } finally {
      isLoading.value = false
    }
  }

  async function getLaboratoryById(id: string) {
    isLoading.value = true
    try {
      laboratory.value = null
      laboratory.value = await laboratoryGateway.getById(id)
    } catch {
      router.push({
        name: 'resource-not-found',
        params: { resource: i18n.global.t('common.laboratory') }
      })
    } finally {
      isLoading.value = false
    }
  }

  async function getAllLaboratories(filters: ILaboratoryFilters = {}) {
    isLoading.value = true
    try {
      laboratories.value = await laboratoryGateway.getAll(filters)
    } catch {
      toast.error({
        message: i18n.global.t('laboratories.list.messages.errorFetchingLaboratories')
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    /* State */
    isLoading,
    laboratory,
    laboratories,
    /* Actions */
    createLaboratory,
    getLaboratoryById,
    getAllLaboratories
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLaboratoriesStore, import.meta.hot))
}
