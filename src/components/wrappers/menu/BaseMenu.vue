<script lang="ts" setup>
import Menu from 'primevue/menu'
import { ref } from 'vue'

const menuRef = ref<InstanceType<typeof Menu> | null>(null)

function toggle(event: any) {
  menuRef.value?.toggle(event)
}

defineExpose({ toggle })
</script>

<template>
  <Menu ref="menuRef" v-bind="$attrs">
    <slot />
  </Menu>
</template>
