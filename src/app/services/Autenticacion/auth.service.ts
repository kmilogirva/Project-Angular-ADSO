import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { CommonModule } from '@angular/common';
// import {MatSidenavModule} from '@angular/material/sidenav';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient;
  baseServerUrl = environment.apiUrl;

  constructor(http : HttpClient) { 
    this.http = http;
  }

  
  login(datosLogin:Array<string>): Observable<{exitoso: boolean; mensaje: string}> {
    return this.http.post<{ exitoso: boolean; mensaje: string }>(
    this.baseServerUrl + environment.loginUsuario,
    {
      Correo: datosLogin[0],
      Contrasena: datosLogin[1]
    },
  ).pipe(
    catchError(error => {
      // Manejo de errores
      if (error.status === 409) {
        return throwError({ exitoso: false, mensaje: 'Credenciales inválidas' });
      }
      return throwError({ exitoso: false, mensaje: 'Error de conexión con el servidor' });
    })
  );
}



  registerUser(Usuario: Array<string>): Observable<{exitoso: boolean; mensaje: string}> {
    return this.http.post<{ exitoso: boolean; mensaje: string }>(
    this.baseServerUrl + environment.crearUsuario,
    {

      Nombres: Usuario[0],
      Apellidos: Usuario[1],
      Correo: Usuario[2],
      Telefono: Usuario[3],
      Sexo: Usuario[4],
      Contrasena: Usuario[5],
    }
  ).pipe(
    catchError(error => {
      // Manejo de errores
      if (error.status === 409) {
        return throwError({ exitoso: false, mensaje: 'El Usuario ya existe' });
      }
      return throwError({ exitoso: false, mensaje: 'Error de conexión con el servidor' });
    })
  );
}
}

