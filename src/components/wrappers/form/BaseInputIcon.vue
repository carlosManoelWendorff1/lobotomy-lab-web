<script setup lang="ts">
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

interface IProps {
  icon: string
  iconPosition?: 'left' | 'right'
}

const { icon = '', iconPosition = 'left' } = defineProps<IProps>()
</script>

<template>
  <IconField :iconPosition="iconPosition">
    <InputIcon :class="icon" />
    <InputText v-bind="$attrs" />
  </IconField>
</template>
