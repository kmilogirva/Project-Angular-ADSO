import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/models/productos/Producto';


@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
  
    private http: HttpClient;
    baseServerUrl = environment.apiUrl;
  
    constructor(http : HttpClient) { 
      this.http = http;
    }

    // registrarProducto(producto: Producto){

    // }

    registrarProducto(producto: Producto) {
        return this.http.post(`${this.baseServerUrl + environment.registrarProductos}`, producto)
  }


    obtenercomboCategorias(){
      

    }


  // registerUser(producto: Producto): Observable<{exitoso: boolean; mensaje: string}> {
  //     return this.http.post(`${this.baseServerUrl + environment.registrarProductos}`, producto)
  //   // ).pipe(
  //   //   catchError(error => {
  //   //     // Manejo de errores
  //   //     if (error.status === 409) {
  //   //       return throwError({ exitoso: false, mensaje: 'El Usuario ya existe' });
  //   //     }
  //   //     return throwError({ exitoso: false, mensaje: 'Error de conexión con el servidor' });
  //   //   })
  //   );

}