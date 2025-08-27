export interface Tercero {
  idTercero?: number;
  nombre1: string;
  nombre2?: string;
  apellido1: string;
  apellido2?: string;
  idTipoIdentificacion: number;
  codDocumento: string;
  idTipoTercero: number;
  idTipoPersona: number;
  idPais: number;
  idDepartamento: number;
  idCiudad: number;
  direccion: string;
  telefono: string;
  email: string;
  idEstado: number;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  idUsuarioCreacion: number;
  idUsuarioModificacion?: number;
}
