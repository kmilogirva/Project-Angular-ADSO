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

  crearUsuario(usuario: Usuario) {
  const url = `${this.baseServerUrl}${environment.crearUsuario}`;
  return this.http.post<Usuario>(url, usuario); // devuelve Usuario
}

actualizarUsuario(usuario: Usuario) {
  console.log("Entre al servicio, soy la entidad", usuario)
  const url = `${this.baseServerUrl}${environment.actualizarUsuarioPorId}`;
  return this.http.put<Usuario>(url, usuario); // también devuelve Usuario
}

  obtenerListadoUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(
      `${this.baseServerUrl}${environment.obtenerListadoUsuarios}`
    );
  }

  obtenerUsuarioPorId(id: number) {
    console.log("Este es el id", id)
     const url = `${this.baseServerUrl + environment.obtenerUsuarioPorId}`
  return this.http.get<any>(url, { params: { idUsuario: id }});
}

eliminarUsuarioPorId(idUsuario: number): Observable<any> {
  const url = `${this.baseServerUrl + environment.eliminarUsuarioPorId}`;
  return this.http.delete(url, {
    params: { idUsuario: idUsuario.toString() }
  });
}

}