<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/properties'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import BaseSidebar from '@/components/wrappers/menu/BaseSidebar.vue'
import PropertyCard from '@/components/properties/PropertyCard.vue'
import BaseBreadcrumb from '@/components/wrappers/misc/BaseBreadcrumb.vue'
import BaseTag from '@/components/wrappers/misc/BaseTag.vue'
import BaseInputDate from '@/components/wrappers/form/BaseInputDate.vue'
import propertiesResolver from '@/utils/propertiesResolver'
import type IPropertyFilters from '@/types/propertyFilters'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const propertiesStore = usePropertiesStore()
const { properties, isLoading } = storeToRefs(propertiesStore)

const isCollapsed = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

const breadcrumbItems = [
  { label: t('common.home'), to: { name: 'home' } },
  { label: t('common.properties') }
]

const filters = ref<IPropertyFilters>({})

async function getAllProperties() {
  const activeFilters = propertiesResolver.getActiveFilters(filters.value)
  router.push({ query: Object.fromEntries(activeFilters) })
  await propertiesStore.getAllProperties(filters.value)
}

async function clearFilters() {
  filters.value = {}
  await getAllProperties()
}

const activeFilters = computed(() => {
  return propertiesResolver.formatActiveFilters(filters.value)
})

onBeforeMount(async () => {
  filters.value = route.query
  await getAllProperties()
})
</script>

<template>
  <div class="flex -m-4">
    <BaseSidebar v-model="isCollapsed">
      <template #default>
        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.location') }}</div>
          <BaseInputIcon
            v-model="filters.location"
            :placeholder="$t('properties.list.filters.locationPlaceholder')"
            icon="pi pi-map-marker"
            iconPosition="right"
            type="search"
            @keyup.enter="getAllProperties"
          />
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.priceRange') }}</div>
          <div class="section__filters">
            <BaseInputNumber
              v-model="filters.minPrice"
              :placeholder="$t('properties.list.from')"
              input-class="w-3"
              mode="currency"
              currency="USD"
              locale="en-US"
              @update:modelValue="getAllProperties"
            />
            <BaseInputNumber
              v-model="filters.maxPrice"
              :placeholder="$t('properties.list.to')"
              input-class="w-3"
              mode="currency"
              currency="USD"
              locale="en-US"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.yearBuilt') }}</div>
          <div class="section__filters">
            <BaseInputDate
              v-model="filters.minYearBuilt"
              :placeholder="$t('properties.list.from')"
              :min-date="new Date(1900, 0, 1)"
              :max-date="new Date()"
              view="year"
              dateFormat="yy"
              input-class="w-3"
              @update:modelValue="getAllProperties"
            />
            <BaseInputDate
              v-model="filters.maxYearBuilt"
              :placeholder="$t('properties.list.to')"
              :min-date="new Date(1900, 0, 1)"
              :max-date="new Date()"
              view="year"
              dateFormat="yy"
              input-class="w-3"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.size') }}</div>
          <div class="section__filters">
            <BaseInputNumber
              v-model="filters.minSize"
              :placeholder="$t('properties.list.from')"
              input-class="w-3"
              suffix="m²"
              @update:modelValue="getAllProperties"
            />
            <BaseInputNumber
              v-model="filters.maxSize"
              :placeholder="$t('properties.list.to')"
              input-class="w-3"
              suffix="m²"
              @update:modelValue="getAllProperties"
            />
          </div>
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.bedrooms') }}</div>
          <BaseInputNumber
            v-model="filters.minBedrooms"
            placeholder="Minimum"
            @update:modelValue="getAllProperties"
          />
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.bathrooms') }}</div>
          <BaseInputNumber
            v-model="filters.minBathrooms"
            placeholder="Minimum"
            @update:modelValue="getAllProperties"
          />
        </div>

        <div class="section">
          <div class="section__title">{{ $t('properties.list.filters.sellerTypes') }}</div>
          <BaseCheckboxGroup
            v-model="filters.sellerTypes"
            name="sellerTypes"
            :options="propertiesResolver.sellerTypesOptions"
          />
        </div>

        <div class="p-3">
          <div class="section__title">{{ $t('properties.list.filters.amenities') }}</div>
          <BaseCheckboxGroup
            v-model="filters.amenities"
            name="amenities"
            :options="propertiesResolver.amenitiesOptions"
          />
        </div>
      </template>

      <template #footer>
        <BaseButton
          :label="$t('properties.list.clearFilters')"
          severity="secondary"
          class="w-full"
          :loading="isLoading"
          @click="clearFilters"
        />
      </template>
    </BaseSidebar>
    <div class="flex-1">
      <div class="top-bar">
        <div class="top-bar__chips">
          <i class="pi pi-sliders-h mr-4" @click="toggleSidebar" style="cursor: pointer" />
          <div class="top-bar__active-filters">
            <BaseTag
              v-for="(activeFilter, index) in activeFilters"
              :key="index"
              :value="activeFilter"
              severity="secondary"
            />
          </div>
        </div>
        <div class="top-bar__filters">
          <BaseInputIcon
            v-model="filters.title"
            :placeholder="$t('properties.list.filters.titlePlaceholder')"
            icon="pi pi-search"
            type="search"
            icon-position="left"
            class="w-full"
            @keyup.enter="getAllProperties"
          />
          <BaseDropdown
            v-model="filters.sortBy"
            :options="propertiesResolver.sortByOptions"
            :placeholder="$t('properties.list.mostRelevant')"
            option-label="label"
            option-value="value"
            @update:modelValue="getAllProperties"
          />
        </div>
      </div>
      <div class="properties-list">
        <header class="mb-4">
          <BaseBreadcrumb :model="breadcrumbItems" />
          <h2 class="mb-1">{{ $t('common.properties') }}</h2>
          <p class="m-0">{{ $t('properties.list.description', { count: properties.length }) }}</p>
        </header>
        <div v-if="isLoading" class="properties-list__cards">
          <BaseSkeleton v-for="n in 8" :key="n" width="23rem" height="36rem" border-radius="8px" />
        </div>
        <div v-else class="properties-list__skeletons">
          <PropertyCard v-for="property in properties" :key="property.id" :property />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding: 1rem;
  border-bottom: 1px solid var(--content-border-color);
}
.section__title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.section__filters,
.top-bar__filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--content-background);
  padding: 1rem;
}
.top-bar__chips {
  display: flex;
  align-items: center;
}
.top-bar__active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.properties-list {
  padding: 2rem;
  height: calc(100vh - 134px);
  overflow-y: auto;
}
.properties-list__cards,
.properties-list__skeletons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
@media (max-width: 1024px) {
  .top-bar__active-filters {
    display: none;
  }
}
</style>
