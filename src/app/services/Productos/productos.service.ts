import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/models/productos/Producto';
import {ListadoProductosResponse, ProductosResponse} from 'src/app/models/Response/ProductosResponse'


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
        return this.http.post<ProductosResponse>(`${this.baseServerUrl + environment.registrarProductos}`, producto)
  }

  actualizarProducto(producto: Producto) {
    console.log("Este es mientidad en el service", producto)
  const url = `${this.baseServerUrl}${environment.actualizarProducto}/${producto.idProducto}`;
  console.log("URL SERVICES", url)
  return this.http.put<ProductosResponse>(url, producto);
}


    obtenercomboCategorias(){
    }

   obtenerListadoProductos(): Observable<ListadoProductosResponse> {
    return this.http.get<ListadoProductosResponse>(
      `${this.baseServerUrl}${environment.obtenerListadoProductos}`
    );
  }

  obtenerProductoPorId(id: number) {
  return this.http.get<any>(`${this.baseServerUrl + environment.obtenerProductoPorId}`, {
    params: { idProducto: id }
  });
}

}