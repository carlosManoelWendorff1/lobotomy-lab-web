<script lang="ts" setup>
import { useId } from 'vue'
import Textarea from 'primevue/textarea'

defineProps<{ label?: string; error?: string }>()

const modelValue = defineModel<String | Number>()
const inputId = useId()
</script>

<template>
  <div>
    <label v-if="label" :for="inputId">
      {{ label }}
    </label>
    <Textarea
      v-bind="$attrs"
      v-model="modelValue"
      :id="inputId"
      :aria-labelledby="error ? `${inputId}-error` : undefined"
      :aria-invalid="!!error"
      :invalid="!!error"
      class="w-full"
    />
    <small class="p-error" v-if="error" :id="`${inputId}-error`" aria-live="assertive">
      {{ error }}
    </small>
  </div>
</template>
