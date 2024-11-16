<script setup lang="ts">
import { onBeforeMount } from 'vue'
import BaseToast from '@/components/wrappers/misc/BaseToast.vue'
import useTheme from '@/composables/useTheme'

const { toggleTheme } = useTheme()

onBeforeMount(toggleTheme)
</script>

<template>
  <RouterView />
  <BaseToast />
</template>
