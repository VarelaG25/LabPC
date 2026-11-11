import type { LaboratoryDto } from '../models/laboratory.model'

/** Laboratorios de prueba con la misma forma que los del backend. */
export const laboratoriesMock: LaboratoryDto[] = [
  { id: 1, name: 'Lab. Bases de Datos', location: 'Edificio A · Planta baja', capacity: 20, created_date: '2025-01-10T15:00:00.000Z' },
  { id: 2, name: 'Lab. Redes', location: 'Edificio A · Primer piso', capacity: 16, created_date: '2025-01-10T15:00:00.000Z' },
  { id: 3, name: 'Lab. Programación', location: 'Edificio B · Primer piso', capacity: 24, created_date: '2025-01-10T15:00:00.000Z' },
  { id: 4, name: 'Lab. Diseño', location: 'Edificio B · Segundo piso', capacity: 20, created_date: '2025-01-10T15:00:00.000Z' },
  { id: 5, name: 'Lab. Multimedia', location: 'Edificio C · Planta baja', capacity: 20, created_date: '2025-01-10T15:00:00.000Z' },
]
