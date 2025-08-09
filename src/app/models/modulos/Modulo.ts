export interface Modulo {
  id?: number;
  nombre: string;
  descripcion?: string;
  idEstado: number;
  idUsuarioCreacion?: number;
  fechaCreacion?: Date
  idUsuarioModificacion?: number;
  fechaModificacion?: Date
}