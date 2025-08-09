import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modulo } from 'src/app/models/modulos/Modulo';
import { Submodulo } from 'src/app/models/modulos/Submodulo';
// import { SubmoduloDto } from 'src/app/models/modulos/RolesPermisosAccion';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  private http: HttpClient;
  baseServerUrl = environment.apiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

    //Modulos
  registrarModulo(modulo: Modulo): Observable<Modulo> {
    console.log(modulo)
    const url = `${this.baseServerUrl}${environment.registrarModulo}`;
    return this.http.post<Modulo>(url, modulo).pipe(
      catchError(error => {
        console.error('Error al registrar módulo:', error);
        return throwError(() => error);
      })
    );
  }

  actualizarModulo(modulo: Modulo): Observable<Modulo> {
    const url = `${this.baseServerUrl}${environment.actualizarModulo}`;
    console.log("Soy la clase a enviar", modulo)
    return this.http.put<Modulo>(url, modulo).pipe(
      catchError(error => {
        console.error('Error al actualizar módulo:', error);
        return throwError(() => error);
      })
    );
  }

  obtenerListadoModulos(): Observable<Modulo[]> {
    const url = `${this.baseServerUrl}${environment.obtenerListadoModulos}`;
    return this.http.get<Modulo[]>(url);
  }

  obtenerModuloPorId(id: number): Observable<Modulo> {
    const url = `${this.baseServerUrl}${environment.obtenerModuloPorId}/${id}`;
    return this.http.get<Modulo>(url, {
    });
  }

  eliminarModuloPorId(id: number): Observable<Modulo> {
    const url = `${this.baseServerUrl}${environment.eliminarModulo}/${id}`;
    return this.http.delete<Modulo>(url, {
    });
  }

  //Submodulo
  crearSubmodulo(submodulo: Submodulo): Observable<Submodulo> {
    console.log("Entr+o por el servicio", submodulo)
    const url = `${this.baseServerUrl}${environment.registrarSubModulo}`;
  return this.http.post<Submodulo>(`${url}`, submodulo);
}



 obtenerSubModuloPorId(id: number): Observable<Submodulo> {
  const url = `${this.baseServerUrl}${environment.obtenerSubModuloPorId}`;
    return this.http.get<Submodulo>(`${url}/${id}`);
  }

  obtenerListadoSubmodulos(): Observable<Submodulo[]> {
     const url = `${this.baseServerUrl}${environment.obtenerListadoSubModulos}`;
    return this.http.get<Submodulo[]>(`${url}`);
    console.log()
  }

  //   obtenerListadoSubmodulosDto(): Observable<SubmoduloDto[]> {
  //    const url = `${this.baseServerUrl}${environment.obtenerListadoSubModulos}`;
  //   return this.http.get<SubmoduloDto[]>(`${url}`);
  //   console.log()
  // }

actualizarSubmodulo(submodulo: Submodulo): Observable<Submodulo> {
  console.log("Soy la clase a enviar al backend para actualizar", submodulo)
   const url = `${this.baseServerUrl}${environment.actualizarSubModulo}`;
    return this.http.put<Submodulo>(`${url}`, submodulo);
  }

  eliminarSubmoduloPorId(id: number): Observable<any> {
    const url = `${this.baseServerUrl}${environment.eliminarSubModulo}`;
    return this.http.delete(`${url}/${id}`);
  }

}
