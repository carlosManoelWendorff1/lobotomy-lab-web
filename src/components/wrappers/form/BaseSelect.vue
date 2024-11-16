<script lang="ts" setup>
import { useId } from 'vue'
import Select from 'primevue/select'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<String | Number>()
const inputId = useId()
</script>

<template>
  <div>
    <label v-if="label" :for="inputId">
      {{ label }}
    </label>
    <Select
      v-bind="$attrs"
      v-model="modelValue"
      :id="inputId"
      :aria-labelledby="error ? `${inputId}-error` : undefined"
      :aria-invalid="!!error"
      :invalid="!!error"
      class="w-full"
    >
      <template #option="{ option }">
        <slot name="option" :option="option" />
      </template>
      <template #value="{ value, placeholder }">
        <slot name="value" :value="value" :placeholder="placeholder" />
      </template>
    </Select>
    <small class="p-error" v-if="error" :id="`${inputId}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
