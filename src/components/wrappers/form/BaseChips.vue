<script lang="ts" setup>
import { useId } from 'vue'
import Chips from 'primevue/chips'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<String[]>()
const inputId = useId()
</script>

<template>
  <div class="p-fluid">
    <label v-if="label" :for="inputId">
      {{ label }}
    </label>
    <Chips
      v-bind="$attrs"
      v-model="modelValue"
      :id="inputId"
      :aria-labelledby="error ? `${inputId}-error` : undefined"
      :aria-invalid="!!error"
      :invalid="!!error"
      input-class="w-full"
    />
    <small class="p-error" v-if="error" :id="`${inputId}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
