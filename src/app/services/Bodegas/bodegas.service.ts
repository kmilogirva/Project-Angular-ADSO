import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Bodega {
  idBodega: number;
  nombreBodega: string;
  ubicacion: string;
  cantidadMaxima: number;
  idEstado: boolean; 
  fechaCreacion?: Date;
  idUsuarioCreacion?: number;
  fechaModificacion?: Date;
  idUsuarioModificacion?: number;
}


@Injectable({
  providedIn: 'root'
})
export class BodegasService {

  private baseUrl = environment.apiUrl;
  // private baseUrl = 'http://localhost:61200/api/Bodegas';

  constructor(private http: HttpClient) {}

  listarBodegas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Bodegas/listarbodegas`, {});
  }

  obtenerBodegaPorId(id: number): Observable<Bodega> {
    return this.http.get<Bodega>(`${this.baseUrl}Bodegas/BuscarBodegaporId?id=${id}`);
  }

  crearBodega(bodega: Bodega): Observable<Bodega> {
    console.log("Entre por el servicio crearBodega() ", bodega)
    return this.http.post<Bodega>(`${this.baseUrl}Bodegas/CrearBodega`, bodega);
  }

  actualizarBodega(bodega: Bodega): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}Bodegas/ActualizaunaBodegaporid?id=${bodega.idBodega}`, bodega);
  }

  eliminarBodega(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Bodegas/EliminarbodegaporId?id=${id}`);
  }
}
