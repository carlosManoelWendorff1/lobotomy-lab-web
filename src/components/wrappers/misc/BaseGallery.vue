<script lang="ts" setup>
import Galleria from 'primevue/galleria'
import { computed } from 'vue'

interface IProps {
  images: string[]
}

const { images } = defineProps<IProps>()

const value = computed(() =>
  images.map((image) => {
    return {
      source: image,
      alt: 'Property Image'
    }
  })
)
</script>

<template>
  <Galleria v-bind="$attrs" :value>
    <template #item="{ item: image }">
      <!-- TODO: Uncomment this line when unsplash API is working again -->
      <!-- <img :src="image.source" :alt="image.alt" class="image" /> -->
      <img src="@/assets/images/house.jpg" :alt="image.alt" class="image" />
    </template>
  </Galleria>
</template>

<style scoped>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<style>
.p-galleria-indicator-list {
  padding: 0.35rem !important;
}
.p-galleria-indicator-button {
  height: 0.65rem !important;
  width: 0.65rem !important;
}
</style>
