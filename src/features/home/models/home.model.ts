import type { IconName } from '@/core/constants'

/** Tarjeta de indicador del inicio del estudiante. */
export interface HomeStat {
  label: string
  value: string
  icon: IconName
  tone: 'purple' | 'green' | 'blue' | 'teal'
}

/** Acceso rápido del inicio. */
export interface QuickAction {
  title: string
  description: string
  icon: IconName
  tone: 'purple' | 'blue'
}
