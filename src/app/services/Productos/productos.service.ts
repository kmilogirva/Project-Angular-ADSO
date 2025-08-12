import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/models/productos/Producto';
import {ListadoProductosResponse, ProductosResponse} from 'src/app/models/Response/Productos/ProductosResponse'


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
      const url = `${this.baseServerUrl + environment.registrarProductos}`
      console.log('Services Producto')
        return this.http.post<Producto>(url, producto)
  }

  actualizarProducto(producto: Producto) {
    console.log("dta de actualizarProducto",producto)
  const url = `${this.baseServerUrl}${environment.actualizarProducto}`;
  return this.http.put<Producto>(url, producto);
}


    obtenercomboCategorias(){
    }

   obtenerListadoProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.baseServerUrl}${environment.obtenerListadoProductos}`
    );
  }

  obtenerProductoPorId(id: number) {
  return this.http.get<any>(`${this.baseServerUrl + environment.obtenerProductoPorId}`, {
    params: { idProducto: id }
  });
}

}