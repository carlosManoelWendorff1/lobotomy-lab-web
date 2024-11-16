<script lang="ts" setup>
import Dialog from 'primevue/dialog'
</script>

<template>
  <Dialog v-bind="$attrs" modal :draggable="false">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <template v-if="$slots.default">
      <slot />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>
