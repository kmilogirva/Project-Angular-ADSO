export interface UsuarioResponse {
    idTercero: number;
    nombreCompleto: string;
    telefono: string;
    email: string;
    idUsuario?: number;
    nombreRol?: string;
    idRol?: number;
    contrasena?: string;
    codUsuario?: string;
    idEstado: number;
}