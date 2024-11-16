<script lang="ts" setup>
import InlineMessage from 'primevue/inlinemessage'

interface IProps {
  text: string
}

const { text } = defineProps<IProps>()
</script>

<template>
  <InlineMessage v-bind="$attrs">{{ text }}</InlineMessage>
</template>
