<script lang="ts" setup>
const isCollapsed = defineModel()
</script>

<template>
  <div :class="['sidebar', { 'sidebar--collapsed': isCollapsed }]">
    <div class="sidebar__header">
      <slot name="header" />
    </div>
    <div class="sidebar__content">
      <slot name="default" />
    </div>
    <div class="sidebar__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(100vw / 7);
  height: calc(100vh - 64px);
  animation: slideIn 0.5s ease;
  background-color: var(--content-background);
}
.sidebar--collapsed {
  display: none;
}
.sidebar__header {
  flex: 0 0 auto;
  padding: 0 1rem;
}
.sidebar__content {
  flex: 1 1 auto;
  overflow-y: auto;
}
.sidebar__content::-webkit-scrollbar {
  width: 0;
}
.sidebar__content:hover::-webkit-scrollbar {
  width: 8px;
}
.sidebar__footer {
  flex: 0 0 auto;
  padding: 1rem;
  border-top: 1px solid var(--content-border-color);
}
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
@media (max-width: 1024px) {
  .sidebar {
    display: none;
  }
}
</style>
