<script lang="ts" setup>
import Breadcrumb from 'primevue/breadcrumb'
</script>

<template>
  <Breadcrumb v-bind="$attrs">
    <template #separator>
      <i class="pi pi-chevron-right" style="font-size: 0.5rem" />
    </template>
  </Breadcrumb>
</template>

<style>
.p-breadcrumb {
  background: transparent !important;
  padding: 0 !important;
}
.p-breadcrumb > .p-menuitem-text {
  font-size: 0.5rem !important;
}
</style>
