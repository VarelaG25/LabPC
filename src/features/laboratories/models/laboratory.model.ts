/** Laboratorio de cómputo. */
export interface Laboratory {
  id: string
  name: string
  location: string
  capacity: number
}

/** Laboratorio tal como lo envía el backend. */
export interface LaboratoryDto {
  id: number
  name: string | null
  location: string | null
  capacity: number
  created_date: string | null
}

/** Datos que se envían al crear o editar un laboratorio. */
export interface LaboratoryRequestDto {
  name: string
  location?: string | null
  capacity?: number
}

export function toLaboratory(dto: LaboratoryDto): Laboratory {
  return {
    id: String(dto.id),
    name: dto.name ?? '',
    location: dto.location ?? '',
    capacity: dto.capacity,
  }
}
