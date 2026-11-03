/** Tipos de apoyo reutilizados por componentes y features. */

export interface SelectOption<T extends string | number = string> {
  value: T
  label: string
  disabled?: boolean
}

export interface TableColumn {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
}

/** Estado estándar de una operación asíncrona en un ViewModel. */
export interface AsyncState {
  isLoading: boolean
  error: string | null
}
