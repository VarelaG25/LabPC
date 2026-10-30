<script lang="ts" setup generic="T extends object">
import { MESSAGES } from '@/core/constants'
import type { TableColumn } from '@/core/models'

/**
 * Tabla reutilizable. Cualquier celda se puede personalizar con un slot `cell-<key>`:
 *   <template #cell-status="{ row }"> ... </template>
 */
withDefaults(
  defineProps<{
    columns: TableColumn[]
    rows: T[]
    rowKey: keyof T
    loading?: boolean
    emptyText?: string
  }>(),
  { loading: false, emptyText: MESSAGES.common.empty },
)

defineSlots<Record<`cell-${string}`, (props: { row: T }) => unknown>>()

function cellValue(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" :class="`align-${column.align ?? 'left'}`">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="placeholder">{{ MESSAGES.common.loading }}</td>
        </tr>
        <tr v-else-if="rows.length === 0">
          <td :colspan="columns.length" class="placeholder">{{ emptyText }}</td>
        </tr>
        <template v-else>
          <tr v-for="row in rows" :key="String(row[rowKey])">
            <td v-for="column in columns" :key="column.key" :class="`align-${column.align ?? 'left'}`">
              <slot :name="`cell-${column.key}`" :row="row">{{ cellValue(row, column.key) }}</slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-md);
  text-align: left;
}

th {
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-subtle);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  font-weight: 600;
  white-space: nowrap;
}

td {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

tbody tr:last-child td {
  border-bottom: none;
}

.align-right {
  text-align: right;
}

.align-center {
  text-align: center;
}

.placeholder {
  padding: 32px 20px;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
