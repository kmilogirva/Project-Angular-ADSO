export interface Usuario {
  idUsuario?: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  sexo: string;
  contraseña: string;
  rol?: string[];
}
