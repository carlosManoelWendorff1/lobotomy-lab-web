<script lang="ts" setup>
interface IProps {
  name: string
  options: { label: string; value: string }[]
}

const { name } = defineProps<IProps>()

const modelValue = defineModel()
</script>

<template>
  <div v-for="({ label, value }, index) in options" :key="index">
    <BaseCheckbox v-model="modelValue" :name :label :value />
  </div>
</template>
