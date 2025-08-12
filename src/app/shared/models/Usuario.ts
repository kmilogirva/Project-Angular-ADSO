export interface Usuario {
  idUsuario?: number;
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  correo: string;
  telefono: string;
  sexo: string;
  contrasena: string;
  idRol?: number;
  idEstado: number;
  idUsuarioCreacion :number
  idUsuarioModificacion?: number
}
