<script lang="ts" setup>
import { useId } from 'vue'
import Checkbox from 'primevue/checkbox'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<boolean | string[]>()

const inputId = useId()
</script>

<template>
  <div>
    <div class="flex align-items-center gap-2">
      <Checkbox
        v-bind="$attrs"
        v-model="modelValue"
        :inputId="inputId"
        :aria-labelledby="error ? `${inputId}-error` : undefined"
        :aria-invalid="!!error"
        :invalid="!!error"
      />
      <label v-if="label" :for="inputId">{{ label }}</label>
    </div>
    <small class="p-error" v-if="error" :id="`${inputId}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
