import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RestablecerContrasena } from 'src/app/models/Response/Seguridad/RestablecerContrasena';
import { SolicitudRecuperacion } from 'src/app/models/Response/Seguridad/SolicitudRecuperacion';

export interface ResponseMessages {
  exitoso: boolean;
  mensaje: string;
  data?: any | null;
}

@Injectable({
  providedIn: 'root',
})
export class RecuperacionService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Solicita al backend el envío del email de recuperación.
   * @param correo Email del usuario
   */
  solicitarRecuperacion(correo: string): Observable<ResponseMessages> {
    const url = `${this.baseUrl}${environment.solicitarRecuperacion}`;
    return this.http.post<ResponseMessages>(`${url}/${correo}`, {});
  }

  /**
   * Envía el token y la nueva contraseña para restablecer.
   * @param token Token recibido en el link por correo
   * @param nuevaContrasena Nueva contraseña (valídala en el frontend)
   */
  restablecerContrasena(
    restablecerContrasena: RestablecerContrasena
  ): Observable<void> {
    const url = `${this.baseUrl}${environment.restablecerContrasena}`;
    return this.http.post<void>(url, restablecerContrasena);
  }
}
