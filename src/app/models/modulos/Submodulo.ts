export interface Submodulo {
  idSubModulo?: number;
  nombre: string;
  descripcion: string;
  idModulo: number;
  idEstado: number;
  fechaCreacion?: Date;
  idUsuarioCreacion?: number;
  fechaModificacion?: Date;
  idUsuarioModificacion?: number;
}

// export interface SubmoduloPermiso extends Submodulo {
//   nombreModulo: string;
//   nombreSubmodulo: string;
//   ver: boolean;
//   crear: boolean;
//   editar: boolean;
//   eliminar: boolean;
// }