<template>
  <div class="network-error">
    <div class="network-error__message">
      <h1>{{ $t('networkError.title') }}</h1>
      <h2>{{ $t('common.networkError') }}</h2>
      <p>
        {{ $t('networkError.description-start') }}
        <a class="emphasis" @click="$router.go(-1)">{{ $t('networkError.description-link') }}</a>
        {{ $t('networkError.description-end') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.network-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
}
.network-error__message {
  max-width: 600px;
}
h1 {
  font-size: 4rem;
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
.emphasis:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
