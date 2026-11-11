import { BACKEND_COMPUTER_STATUS, BACKEND_COMPUTER_STATUS_VALUE, type ComputerStatus } from '@/core/constants'
import { toBackendId } from '@/core/models'
import type { LaboratoryDto } from '@/features/laboratories/models/laboratory.model'

/** Separador de las especificaciones cuando se guardan como un solo texto. */
export const SPECS_SEPARATOR = ' / '

/** Equipo de cómputo (modelo de dominio usado por las vistas). */
export interface Computer {
  id: string
  /** Código visible, p. ej. `PC-07`. */
  code: string
  laboratoryId: string | null
  /** Nombre del laboratorio (para mostrar y filtrar). */
  laboratory: string
  /** Especificaciones en lista: `['Intel i7', '16GB RAM', ...]`. */
  specs: string[]
  status: ComputerStatus
  createdAt: string | null
}

/** Equipo tal como lo envía el backend. */
export interface ComputerDto {
  id: number
  code: string | null
  /** Texto libre, p. ej. `Intel i7 / 16GB RAM / 1TB HDD / Windows 11`. */
  specs: string | null
  /** Estado: 1 disponible · 2 reservado · 3 en uso · 4 en mantenimiento. */
  status: number
  laboratoryId: number | null
  laboratory: LaboratoryDto | null
  created_date: string | null
}

/** Datos que se envían al crear o editar un equipo. */
export interface ComputerRequestDto {
  code: string
  specs?: string | null
  status?: number
  laboratoryId: number
}

/** Datos del formulario de alta / edición de equipos. */
export interface ComputerPayload {
  code: string
  laboratoryId: string
  specs: string[]
  status: ComputerStatus
}

export function parseSpecs(specs?: string | null): string[] {
  return (specs ?? '')
    .split('/')
    .map((spec) => spec.trim())
    .filter(Boolean)
}

export function toComputer(dto: ComputerDto): Computer {
  return {
    id: String(dto.id),
    code: dto.code ?? '',
    laboratoryId: dto.laboratoryId !== null ? String(dto.laboratoryId) : null,
    laboratory: dto.laboratory?.name ?? '—',
    specs: parseSpecs(dto.specs),
    status: BACKEND_COMPUTER_STATUS[dto.status] ?? 'available',
    createdAt: dto.created_date,
  }
}

/** Convierte el formulario en la petición al backend (el código va en mayúsculas). */
export function toComputerRequest(payload: ComputerPayload): ComputerRequestDto {
  return {
    code: payload.code.trim().toUpperCase(),
    specs: payload.specs.join(SPECS_SEPARATOR) || null,
    status: BACKEND_COMPUTER_STATUS_VALUE[payload.status],
    laboratoryId: toBackendId(payload.laboratoryId),
  }
}
