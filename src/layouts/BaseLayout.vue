<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import BaseAvatar from '@/components/wrappers/misc/BaseAvatar.vue'
import BaseMenu from '@/components/wrappers/menu/BaseMenu.vue'
import BaseMenubar from '@/components/wrappers/menu/BaseMenubar.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import useTheme from '@/composables/useTheme'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const { user, isLoggedIn } = storeToRefs(userStore)
const { isLight } = useTheme()

function redirectTo(name: string) {
  router.push({ name })
}

const menubarItems = computed(() => [
  {
    label: t('common.home'),
    command: () => redirectTo('home')
  },
  {
    label: t('common.properties'),
    command: () => redirectTo('properties-list')
  },
  {
    label: t('common.advertise'),
    command: () => redirectTo('property-advertise')
  },
  {
    label: t('common.help'),
    items: [
      {
        label: t('common.security'),
        route: '/security'
      }
    ]
  }
])

const items = computed(() => [
  {
    label: t('common.profile'),
    items: [
      {
        label: t('common.settings'),
        icon: 'pi pi-cog',
        command: () => settingsDialogRef?.value?.openDialog()
      },
      {
        label: t('common.logout'),
        icon: 'pi pi-sign-out',
        command: () => userStore.logout()
      }
    ]
  }
])

const menuRef = ref<InstanceType<typeof BaseMenu> | null>(null)
const settingsDialogRef = ref<InstanceType<typeof SettingsDialog> | null>(null)
</script>

<template>
  <BaseMenubar :model="menubarItems">
    <template #start>
      <div class="menubar__start" @click="redirectTo('home')">Real Estate</div>
    </template>

    <template #end>
      <div v-if="isLoggedIn" class="menubar__end" @click="menuRef?.toggle($event)">
        <div>
          <div class="text-sm font-semibold">{{ user?.fullName }}</div>
          <div class="text-xs">{{ user?.email }}</div>
        </div>
        <BaseAvatar :image="user?.avatarUrl" aria-haspopup="true" aria-controls="overlay_menu" />
        <i class="pi pi-angle-down" />
      </div>
      <BaseButton
        v-else
        :label="$t('common.login')"
        class="cursor-pointer"
        icon="pi pi-user"
        text
        plain
        @click="redirectTo('login')"
      />
    </template>
  </BaseMenubar>

  <div :class="['content-container', { 'content-container--light': isLight }]">
    <RouterView />
  </div>

  <BaseMenu ref="menuRef" id="overlay_menu" :model="items" popup />
  <SettingsDialog ref="settingsDialogRef" />
</template>

<style scoped>
.menubar__start {
  font-size: 1.75rem;
  font-weight: 600;
  margin-left: 1rem;
  color: var(--primary-color);
}
.menubar__end {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin-right: 1rem;
}
.content-container {
  height: calc(100vh - 64px);
  padding: 1.5rem;
  overflow-y: auto;
}
.content-container--light {
  background-color: var(--surface-50);
}
</style>

<style>
.p-menubar-root-list,
.p-menubar-button {
  position: absolute;
  left: 40%;
}
@media screen and (max-width: 960px) {
  .p-menubar-root-list,
  .p-menubar-button {
    position: static;
    margin-left: 2rem;
  }
}
</style>
