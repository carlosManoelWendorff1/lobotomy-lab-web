<script lang="ts" setup>
import Menubar from 'primevue/menubar'
</script>

<template>
  <Menubar v-bind="$attrs">
    <template #start>
      <slot name="start" />
    </template>
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
      </a>
    </template>
    <template #end>
      <slot name="end" />
    </template>
  </Menubar>
</template>
