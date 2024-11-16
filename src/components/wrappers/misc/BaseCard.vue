<script lang="ts" setup>
import Card from 'primevue/card'
</script>

<template>
  <Card>
    <template #header v-if="$slots.header">
      <slot name="header" />
    </template>
    <template #title v-if="$slots.title">
      <slot name="title" />
    </template>
    <template #subtitle v-if="$slots.subtitle">
      <slot name="subtitle" />
    </template>
    <template #content v-if="$slots.content">
      <slot name="content" />
    </template>
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </Card>
</template>
