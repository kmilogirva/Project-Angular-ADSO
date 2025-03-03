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

    registrarProducto(producto: Producto): Observable<Producto> {
        return this.http.post<Producto>(this.baseServerUrl + , producto);
      }

}