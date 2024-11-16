<script lang="ts" setup>
import type Seller from '@/types/models/Seller'

defineProps<{ seller: Seller }>()
</script>

<template>
  <BaseCard>
    <template #title> {{ $t('properties.aboutTheSeller') }} </template>
    <template #content>
      <div class="seller-card">
        <p class="seller-card__title">{{ seller.name }}</p>
        <p>{{ seller.email }}</p>
        <p>{{ seller.phone }}</p>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>
.seller-card__title {
  font-weight: 600;
  margin-bottom: 1rem;
}
.seller-card p {
  margin: 0;
}
</style>
