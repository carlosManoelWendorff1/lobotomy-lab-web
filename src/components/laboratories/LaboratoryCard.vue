<script lang="ts" setup>
import { useRouter } from 'vue-router'
import BaseGallery from '@/components/wrappers/misc/BaseGallery.vue'
import type Laboratory from '@/types/models/Laboratory'

const { laboratory } = defineProps<{ laboratory: Laboratory | null; showExtendedInfo?: boolean }>()

const router = useRouter()

function redirectToLaboratoryDetails() {
  router.push({ name: 'laboratory-details', params: { id: laboratory?.id } })
}
</script>

<template>
  <BaseCard v-if="laboratory" class="laboratory-card">
    <template #header>
      <BaseGallery
        :images="laboratory.imageSources"
        :show-thumbnails="false"
        show-indicators-on-item
        show-item-navigators-on-hover
        show-indicators
        circular
      />
    </template>

    <template #title>
      {{ laboratory.title }}
    </template>

    <template #content>
      <p>{{ laboratory.description }}</p>

      <div v-if="!showExtendedInfo">
        <p class="font-semibold">{{ $n(laboratory.price, 'currency') }}</p>
        <p>
          <i class="pi pi-map-marker" />
          {{ laboratory.location.city }} - {{ laboratory.location.state }}
        </p>
      </div>

      <div v-else class="laboratory-card__extended-info">
        <div>
          <div class="font-medium">{{ $t('fields.price') }}</div>
          <div>{{ $n(laboratory.price, 'currency') }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('laboratories.form.location') }}</div>
          <div>{{ laboratory.location.city }} - {{ laboratory.location.state }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.size') }}</div>
          <div>{{ laboratory.size }}m²</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.bedrooms') }}</div>
          <div>{{ laboratory.bedrooms }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.bathrooms') }}</div>
          <div>{{ laboratory.bathrooms }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.type') }}</div>
          <div>{{ laboratory.type }}</div>
        </div>
        <div>
          <div class="font-medium">{{ $t('fields.availability') }}</div>
          <div>{{ laboratory.availability }}</div>
        </div>
      </div>
    </template>

    <template #footer>
      <BaseButton
        v-if="!showExtendedInfo"
        label="View"
        data-testid="view-button"
        @click="redirectToLaboratoryDetails"
      />
    </template>
  </BaseCard>
</template>

<style scoped>
.laboratory-card__extended-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3rem;
  margin-top: 1.5rem;
}
</style>
