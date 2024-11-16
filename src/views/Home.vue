<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type PropertyType = 'House' | 'Apartment'

const router = useRouter()

const location = ref('')
const selectedPropertyType = ref<PropertyType>('House')

function selectPropertyType(type: PropertyType) {
  selectedPropertyType.value = type
}

function redirectToPropertyAdvertise() {
  router.push({ name: 'property-advertise' })
}

function redirectToPropertyList() {
  router.push({
    name: 'properties-list',
    query: { type: selectedPropertyType.value, location: location.value }
  })
}
</script>

<template>
  <div class="property-search">
    <BaseCard class="property-search__card">
      <template #content>
        <div class="property-search__types">
          <div
            :class="[
              'property-search__option',
              { 'property-search__option--selected': selectedPropertyType === 'House' }
            ]"
            @click="selectPropertyType('House')"
          >
            {{ $t('common.houses') }}
          </div>
          <div
            :class="[
              'property-search__option',
              { 'property-search__option--selected': selectedPropertyType === 'Apartment' }
            ]"
            @click="selectPropertyType('Apartment')"
          >
            {{ $t('common.apartments') }}
          </div>
          <div class="property-search__option" @click="redirectToPropertyAdvertise">
            {{ $t('home.wantToSell') }}
          </div>
        </div>

        <div class="property-search__buttons md:flex-row">
          <BaseInputIcon
            v-model="location"
            icon="pi pi-map-marker"
            class="w-full md:w-30rem"
            :placeholder="$t('properties.list.filters.locationPlaceholder')"
            type="search"
            @keyup.enter="redirectToPropertyList"
          />
          <BaseButton
            class="w-full md:w-4"
            :label="$t('home.seeOffers', { count: 8 })"
            @click="redirectToPropertyList"
          />
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<style scoped>
.property-search {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
}
.property-search__card {
  max-width: 800px;
  margin: 0 auto 12rem auto;
}
.property-search__types {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}
.property-search__option {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-color-secondary);
  padding: 0.5rem;
}
.property-search__option:hover {
  color: var(--text-primary-color);
  font-weight: 600;
}
.property-search__option--selected {
  color: var(--text-primary-color);
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
}
.property-search__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
</style>
