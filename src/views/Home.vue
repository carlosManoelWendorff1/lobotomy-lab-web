<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

type laboratoryType = 'House' | 'Apartment'

const router = useRouter()

const location = ref('')
const selectedLaboratoryType = ref<laboratoryType>('House')

function selectLaboratoryType(type: laboratoryType) {
  selectedLaboratoryType.value = type
}

function redirectToLaboratoryAdvertise() {
  router.push({ name: 'laboratory-advertise' })
}

function redirectToLaboratoryList() {
  router.push({
    name: 'laboratories-list',
    query: { type: selectedLaboratoryType.value, location: location.value }
  })
}
</script>

<template>
  <div class="laboratory-search">
    <BaseCard class="laboratory-search__card">
      <template #content>
        <div class="laboratory-search__types">
          <div
            :class="[
              'laboratory-search__option',
              { 'laboratory-search__option--selected': selectedLaboratoryType === 'House' }
            ]"
            @click="selectLaboratoryType('House')"
          >
            {{ $t('common.houses') }}
          </div>
          <div
            :class="[
              'laboratory-search__option',
              { 'laboratory-search__option--selected': selectedLaboratoryType === 'Apartment' }
            ]"
            @click="selectLaboratoryType('Apartment')"
          >
            {{ $t('common.apartments') }}
          </div>
          <div class="laboratory-search__option" @click="redirectToLaboratoryAdvertise">
            {{ $t('home.wantToSell') }}
          </div>
        </div>

        <div class="laboratory-search__buttons md:flex-row">
          <BaseInputIcon
            v-model="location"
            icon="pi pi-map-marker"
            class="w-full md:w-30rem"
            :placeholder="$t('laboratories.list.filters.locationPlaceholder')"
            type="search"
            @keyup.enter="redirectToLaboratoryList"
          />
          <BaseButton
            class="w-full md:w-4"
            :label="$t('home.seeOffers', { count: 8 })"
            @click="redirectToLaboratoryList"
          />
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<style scoped>
.laboratory-search {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
}
.laboratory-search__card {
  max-width: 800px;
  margin: 0 auto 12rem auto;
}
.laboratory-search__types {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}
.laboratory-search__option {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-color-secondary);
  padding: 0.5rem;
}
.laboratory-search__option:hover {
  color: var(--text-primary-color);
  font-weight: 600;
}
.laboratory-search__option--selected {
  color: var(--text-primary-color);
  font-weight: 600;
  border-bottom: 2px solid var(--primary-color);
}
.laboratory-search__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
</style>
