export interface Usuario {
  idUsuario?: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  sexo: string;
  contrasena: string;
  rol?: string[];
  idUsuarioCreacion :number
}
