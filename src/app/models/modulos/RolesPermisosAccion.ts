export interface RolesPermisosAccion {
  idRol: number;
  idSubModulo: number;
  nombreSubModulo?: string;
  idModulo?: number;
  nombreModulo?: string;
  idEstado?: number;
  leer: number;
  crear: number;
  editar: number;
  eliminar: number;
  idUsuarioCreacion: number;
  fechaCreacion?: Date
  idUsuarioModificacion?: number;
  fechaModificacion?: Date
}