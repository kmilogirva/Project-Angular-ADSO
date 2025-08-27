import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ComboResponse } from 'src/app/models/Response/Generales/ComboResponse';
import { Tercero } from 'src/app/models/terceros/Tercero';
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

obtenerComboTiposDocumento(): Observable<ComboResponse[]>{
const url = `${this.baseServerUrl + environment.obtenerComboTiposDocumento}`;
  return this.http.get<ComboResponse[]>(url);
}

obtenerComboTiposTercero(): Observable<ComboResponse[]>{
const url = `${this.baseServerUrl + environment.obtenerComboTiposTercero}`;
  return this.http.get<ComboResponse[]>(url);
}

obtenerComboTiposPersona(): Observable<ComboResponse[]>{
const url = `${this.baseServerUrl + environment.obtenerComboTiposPersona}`;
  return this.http.get<ComboResponse[]>(url);
}

obtenerComboPaises(): Observable<ComboResponse[]>{
const url = `${this.baseServerUrl + environment.obtenerComboPaises}`;
  return this.http.get<ComboResponse[]>(url);
}

obtenerComboDepartamentos(idPais: number): Observable<ComboResponse[]>{
const url = `${this.baseServerUrl + environment.obtenerComboDepartamentos}/${idPais}`;
  return this.http.get<ComboResponse[]>(url);
}

obtenerComboCiudades(idDepartamento: number): Observable<ComboResponse[]>{
const url = `${this.baseServerUrl + environment.obtenerComboCiudades}/${idDepartamento}`;
  return this.http.get<ComboResponse[]>(url);
}


  crearTercero(tercero: Tercero) {
  const url = `${this.baseServerUrl}${environment.crearTercero}`;
  return this.http.post<Usuario>(url, tercero); // devuelve Usuario
}

actualizarTercero(tercero: Tercero) {
  console.log("Entre al servicio, soy la entidad", tercero)
  const url = `${this.baseServerUrl}${environment.actualizarTerceroPorId}`;
  return this.http.put<Usuario>(url, tercero); // también devuelve Usuario
}

  obtenerListadoTercero(): Observable<Tercero[]>{
    return this.http.get<Tercero[]>(
      `${this.baseServerUrl}${environment.obtenerListadoTerceros}`
    );
  }

  obtenerTerceroPorId(id: number) {
    console.log("Este es el id", id)
     const url = `${this.baseServerUrl + environment.obtenerTerceroPorId}`
  return this.http.get<any>(url, { params: { idUsuario: id }});
}

eliminarTerceroPorId(idTercero: number): Observable<any> {
  const url = `${this.baseServerUrl + environment.eliminarTerceroPorId}`;
  return this.http.delete(url, {
    params: { idTercero: idTercero.toString() }
  });
}

}