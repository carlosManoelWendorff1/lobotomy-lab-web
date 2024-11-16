<script lang="ts" setup>
import i18n from '@/plugins/i18n'

interface IProps {
  resource?: string
}

withDefaults(defineProps<IProps>(), {
  resource: i18n.global.t('common.page')
})
</script>

<template>
  <div class="not-found">
    <div class="not-found__message">
      <h1>404</h1>
      <h2>{{ $t('common.notFound') }}</h2>
      <p>{{ $t('notFound.description', { resource }) }}</p>
      <BaseButton :label="$t('notFound.goToHomePage')" @click="$router.push({ name: 'home' })" />
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
}
.not-found__message {
  max-width: 600px;
}
h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}
h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
</style>
