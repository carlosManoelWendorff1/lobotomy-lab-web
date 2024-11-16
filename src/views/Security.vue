<template>
  <div class="security-info">
    <div>
      <div class="security-info__title" v-html="$t('security.title')" />
      <div v-html="$t('security.description')" />
      <div class="security-info__read-carefully" v-html="$t('security.readCarefully')" />
    </div>
    <img
      src="@/assets/images/security.svg"
      alt="Illustration of a security lock"
      class="security-info__image"
    />
  </div>
</template>

<style scoped>
.security-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}
.security-info__title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 2rem;
}
.security-info__read-carefully {
  margin-top: 2rem;
  font-weight: bold;
}
.security-info__image {
  width: 300px;
  margin-top: 2rem;
}
@media screen and (max-width: 768px) {
  .security-info {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
