<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePropertiesStore } from '@/stores/properties'
import { storeToRefs } from 'pinia'
import PropertyCard from '@/components/properties/PropertyCard.vue'
import PropertyContactForm from '@/components/properties/PropertyContactForm.vue'
import SellerCard from '@/components/properties/SellerCard.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'

const { id } = defineProps<{ id: string }>()

const propertiesStore = usePropertiesStore()
const { property, isLoading } = storeToRefs(propertiesStore)

onBeforeMount(async () => await propertiesStore.getPropertyById(id))
</script>

<template>
  <div v-if="isLoading" class="property-details">
    <div class="property-details__card">
      <BaseSkeleton width="55rem" height="29rem" border-radius="8px" />
      <BaseSkeleton width="55rem" height="7rem" border-radius="8px" />
      <BaseSkeleton width="55rem" height="9rem" border-radius="8px" />
    </div>
    <BaseSkeleton width="28rem" height="37rem" border-radius="8px" />
  </div>
  <div v-else class="property-details">
    <div class="property-details__card">
      <PropertyCard :property show-extended-info />

      <BaseCard v-if="property?.amenities">
        <template #title> {{ $t('fields.amenities') }} </template>
        <template #content>
          <BaseTag
            v-for="amenity in property?.amenities"
            :key="amenity"
            :value="amenity"
            severity="secondary"
            class="mr-2"
          />
        </template>
      </BaseCard>

      <SellerCard v-if="property?.seller" :seller="property?.seller" />
    </div>

    <PropertyContactForm :price="property?.price" />
  </div>
</template>

<style scoped>
.property-details {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  padding-top: 1.5rem;
}
.property-details__card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
@media (max-width: 1300px) {
  .property-details {
    max-width: 900px;
    flex-direction: column;
  }
}
</style>
