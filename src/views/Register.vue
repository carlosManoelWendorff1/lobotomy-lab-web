<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useField, useForm } from 'vee-validate'
import { object, string, ref } from 'yup'
import type { RegistrationRequest } from '@/gateways/UserGateway'

const userStore = useUserStore()

const validationSchema = object({
  fullName: string()
    .required()
    .matches(/^[a-zA-Z\s]+$/)
    .min(3),
  email: string().required().email(),
  password: string()
    .required()
    .min(8)
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/)
    .matches(/[@$!%*?&]/),
  passwordConfirmation: string()
    .required()
    .oneOf([ref('password')])
})

const { handleSubmit, errors } = useForm<RegistrationRequest>({ validationSchema })
const { value: fullName } = useField('fullName')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: passwordConfirmation } = useField('passwordConfirmation')

const onSubmit = handleSubmit(userStore.register)
</script>

<template>
  <div class="registration">
    <div class="registration__left-panel">
      <form @submit.prevent="onSubmit" class="registration__form">
        <div class="grid w-7">
          <div class="col-12 mb-2">
            <h1 class="mb-2">{{ $t('common.register') }}</h1>
            <div>
              {{ $t('register.alreadyHaveAccount') }}
              <RouterLink to="/login" class="emphasis">{{ $t('common.login') }}</RouterLink>
            </div>
          </div>

          <div class="col-12">
            <BaseInputText
              v-model="fullName"
              :label="$t('fields.fullName')"
              :placeholder="$t('fields.fullName')"
              :error="errors.fullName"
            />
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
              :feedback="false"
              :label="$t('fields.password')"
              :placeholder="$t('fields.password')"
              :error="errors.password"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseInputPassword
              v-model="passwordConfirmation"
              :feedback="false"
              :label="$t('fields.passwordConfirmation')"
              :placeholder="$t('fields.passwordConfirmation')"
              :error="errors.passwordConfirmation"
              class="w-full"
            />
          </div>
          <div class="col-12">
            <BaseButton
              :label="$t('common.register')"
              type="submit"
              class="w-full mt-4"
              :loading="userStore.isLoading"
            />
          </div>
          <div class="col-12">
            {{ $t('register.agreement') }}
            <a
              href="https://docs.google.com/document/d/1hMUhRYXNNtbEY7Wkjs9qeKi9otZjRRGDLYebxX_0P8c/edit?usp=sharing"
              target="_blank"
              class="emphasis"
            >
              {{ $t('register.termsAndConditions') }}
            </a>
          </div>
        </div>
      </form>
    </div>
    <div class="registration__right-panel" />
  </div>
</template>

<style scoped>
.registration {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.registration__left-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
}
.registration__form {
  display: flex;
  justify-content: center;
}
.registration__right-panel {
  background-color: var(--primary-color);
  width: 50vw;
}
@media (max-width: 1024px) {
  .registration__left-panel {
    width: 100vw;
    height: 100vh;
  }
  .registration__right-panel {
    display: none;
  }
}
</style>
