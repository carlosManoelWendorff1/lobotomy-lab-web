<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useLaboratoriesStore } from '@/stores/laboratories'
import { storeToRefs } from 'pinia'
import LaboratoryCard from '@/components/laboratories/LaboratoryCard.vue'
import LaboratoryContactForm from '@/components/laboratories/LaboratoryContactForm.vue'
import SellerCard from '@/components/laboratories/SellerCard.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'

const { id } = defineProps<{ id: string }>()

const laboratoriesStore = useLaboratoriesStore()
const { laboratory, isLoading } = storeToRefs(laboratoriesStore)

onBeforeMount(async () => await laboratoriesStore.getLaboratoryById(id))
</script>

<template>
  <div v-if="isLoading" class="laboratory-details">
    <div class="laboratory-details__card">
      <BaseSkeleton width="55rem" height="29rem" border-radius="8px" />
      <BaseSkeleton width="55rem" height="7rem" border-radius="8px" />
      <BaseSkeleton width="55rem" height="9rem" border-radius="8px" />
    </div>
    <BaseSkeleton width="28rem" height="37rem" border-radius="8px" />
  </div>
  <div v-else class="laboratory-details">
    <div class="laboratory-details__card">
      <laboratoryCard :laboratory show-extended-info />

      <BaseCard v-if="laboratory?.amenities">
        <template #title> {{ $t('fields.amenities') }} </template>
        <template #content>
          <BaseTag
            v-for="amenity in laboratory?.amenities"
            :key="amenity"
            :value="amenity"
            severity="secondary"
            class="mr-2"
          />
        </template>
      </BaseCard>

      <SellerCard v-if="laboratory?.seller" :seller="laboratory?.seller" />
    </div>

    <laboratoryContactForm :price="laboratory?.price" />
  </div>
</template>

<style scoped>
.laboratory-details {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
}
.laboratory-details__card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (max-width: 1300px) {
  .laboratory-details {
    max-width: 900px;
    flex-direction: column;
  }
}
</style>
