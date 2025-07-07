import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/shared/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
  
    private http: HttpClient;
    baseServerUrl = environment.apiUrl;
  
    constructor(http : HttpClient) { 
      this.http = http;
    }

    crearUsuario(usuario: Usuario): Observable<{ exitoso: boolean; mensaje: string }> {
    return this.http.post<{ exitoso: boolean; mensaje: string }>(
      this.baseServerUrl + environment.crearUsuario,
      usuario
    ).pipe(
      catchError(error => {
        if (error.status === 409) {
          return throwError(() => ({ exitoso: false, mensaje: 'El Usuario ya existe' }));
        }
        return throwError(() => ({ exitoso: false, mensaje: 'Error de conexión con el servidor' }));
      })
    );
  }



}