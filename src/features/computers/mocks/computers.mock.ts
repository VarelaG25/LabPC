import { laboratoriesMock } from '@/features/laboratories/mocks/laboratories.mock'
import type { ComputerDto } from '../models/computer.model'

/** Agrega el laboratorio completo al equipo, como lo hace el backend. */
export function withLaboratory(dto: ComputerDto): ComputerDto {
  return { ...dto, laboratory: laboratoriesMock.find((lab) => lab.id === dto.laboratoryId) ?? null }
}

/**
 * Equipos de prueba con la misma forma que los del backend. `laboratory` se
 * deja en `null` y se completa al responder a partir de `laboratoryId`.
 *
 * Son 20 equipos: 12 disponibles, 4 en uso, 3 reservados y 1 en mantenimiento.
 * El arreglo cambia durante la sesión cuando se agregan, editan o eliminan equipos.
 */
const SPECS = {
  i7: 'Intel i7 / 16GB RAM / 1TB HDD / Windows 11',
  i5: 'Intel i5 / 8GB RAM / 512GB SSD / Windows 11',
  ryzen: 'Ryzen 5 / 16GB RAM / 1TB HDD / Windows 11',
} as const

/** Ids de los laboratorios de prueba. */
const LAB = { databases: 1, networks: 2, programming: 3, design: 4, multimedia: 5 } as const

/** Valores numéricos de los estados de un equipo. */
const STATUS = { available: 1, reserved: 2, inUse: 3, maintenance: 4 } as const

function computer(id: number, laboratoryId: number, specs: string, status: number): ComputerDto {
  return {
    id,
    code: `PC-${String(id).padStart(2, '0')}`,
    specs,
    status,
    laboratoryId,
    laboratory: null,
    created_date: '2025-01-15T15:00:00.000Z',
  }
}

export const computersMock: ComputerDto[] = [
  computer(1, LAB.programming, SPECS.i7, STATUS.available),
  computer(2, LAB.programming, SPECS.i7, STATUS.available),
  computer(3, LAB.networks, SPECS.i5, STATUS.available),
  computer(4, LAB.design, SPECS.i7, STATUS.reserved),
  computer(5, LAB.multimedia, SPECS.ryzen, STATUS.available),
  computer(6, LAB.programming, SPECS.i5, STATUS.inUse),
  computer(7, LAB.databases, SPECS.i7, STATUS.available),
  computer(8, LAB.networks, SPECS.i5, STATUS.maintenance),
  computer(9, LAB.databases, SPECS.i7, STATUS.available),
  computer(10, LAB.design, SPECS.ryzen, STATUS.inUse),
  computer(11, LAB.multimedia, SPECS.ryzen, STATUS.available),
  computer(12, LAB.networks, SPECS.i5, STATUS.reserved),
  computer(13, LAB.programming, SPECS.i7, STATUS.available),
  computer(14, LAB.databases, SPECS.i5, STATUS.inUse),
  computer(15, LAB.design, SPECS.i7, STATUS.available),
  computer(16, LAB.multimedia, SPECS.ryzen, STATUS.reserved),
  computer(17, LAB.programming, SPECS.i5, STATUS.available),
  computer(18, LAB.networks, SPECS.i5, STATUS.inUse),
  computer(19, LAB.databases, SPECS.i7, STATUS.available),
  computer(20, LAB.design, SPECS.i7, STATUS.available),
]
