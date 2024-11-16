<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'
import { object, string } from 'yup'
import type { LoginRequest } from '@/gateways/UserGateway'

const userStore = useUserStore()

const validationSchema = object({
  email: string().required().email(),
  password: string().required()
})

const { handleSubmit, errors } = useForm<LoginRequest>({ validationSchema })
const { value: email } = useField('email')
const { value: password } = useField('password')

const onSubmit = handleSubmit(userStore.login)
</script>

<template>
  <div class="login">
    <div class="login__left-panel" />
    <div class="login__right-panel">
      <form @submit.prevent="onSubmit" class="login__form">
        <div class="grid w-7">
          <div class="col-12">
            <h1>{{ $t('common.login') }}</h1>
          </div>
          <div class="col-12">
            <BaseInputText
              v-model="email"
              :label="$t('fields.email')"
              :placeholder="$t('fields.email')"
              :error="errors.email"
            />
          </div>
          <div class="col-12">
            <BaseInputPassword
              v-model="password"
              toggle-mask
              :feedback="false"
              :label="$t('fields.password')"
              :placeholder="$t('fields.password')"
              :error="errors.password"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseButton
              :label="$t('common.login')"
              type="submit"
              class="w-full mt-4"
              :loading="userStore.isLoading"
            />
          </div>
          <div class="col-12">
            {{ $t('login.dontHaveAccount') }}
            <RouterLink to="/register" class="emphasis">{{ $t('common.register') }}</RouterLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.login__left-panel {
  background-color: var(--primary-color);
  width: 50vw;
}
.login__right-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
}
.login__form {
  display: flex;
  justify-content: center;
}
@media (max-width: 1024px) {
  .login__left-panel {
    display: none;
  }
  .login__right-panel {
    width: 100vw;
    height: 100vh;
  }
}
</style>
