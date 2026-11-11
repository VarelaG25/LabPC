<script lang="ts" setup>
import AppIcon from '@/core/components/AppIcon.vue'
import PageHeader from '@/core/components/PageHeader.vue'
import SelectInput from '@/core/components/SelectInput.vue'
import ComputerCard from '../components/ComputerCard.vue'
import ComputerPagination from '../components/ComputerPagination.vue'
import { useComputerCatalogViewModel } from '../viewmodels/useComputerCatalogViewModel'

const {
  isLoading,
  error,
  search,
  statusFilter,
  laboratoryFilter,
  showFilters,
  page,
  statusOptions,
  laboratoryOptions,
  paginated,
  totalPages,
  rangeLabel,
  activeFilterCount,
  goToPage,
  clearFilters,
  reserve,
} = useComputerCatalogViewModel()
</script>

<template>
  <PageHeader title="Equipos de PC disponibles" subtitle="Consulta el estado y características de los equipos.">
    <template #actions>
      <label class="search-bar">
        <AppIcon name="search" :size="18" />
        <span class="sr-only">Buscar equipo</span>
        <input v-model="search" type="search" placeholder="Buscar equipo (PC)..." />
      </label>
      <button type="button" class="filter-btn" :aria-expanded="showFilters" @click="showFilters = !showFilters">
        <AppIcon name="filter" :size="18" />
        Filtros
        <span v-if="activeFilterCount" class="filter-count">{{ activeFilterCount }}</span>
      </button>
    </template>
  </PageHeader>

  <section v-if="showFilters" class="filters-panel" aria-label="Filtros">
    <SelectInput v-model="statusFilter" :options="statusOptions" placeholder="Estado" />
    <SelectInput v-model="laboratoryFilter" :options="laboratoryOptions" placeholder="Laboratorio" />
    <button type="button" class="clear-btn" @click="clearFilters">Limpiar filtros</button>
  </section>

  <p v-if="error" class="form-error">{{ error }}</p>
  <p v-else-if="isLoading" class="text-muted">Cargando equipos...</p>

  <section v-else class="computers-grid">
    <ComputerCard v-for="pc in paginated" :key="pc.id" :computer="pc" @reserve="reserve" />
  </section>

  <ComputerPagination :page="page" :total-pages="totalPages" :label="rangeLabel" @change="goToPage" />
</template>

<style scoped src="../styles/catalog.css"></style>
