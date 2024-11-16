<script lang="ts" setup>
import Avatar from 'primevue/avatar'

interface IProps {
  image: string | undefined
  shape?: 'circle' | 'square'
}

const { image = undefined, shape = 'circle' } = defineProps<IProps>()
</script>

<template>
  <Avatar v-bind="$attrs" :image :shape :icon="image ? undefined : 'pi pi-user'" />
</template>
