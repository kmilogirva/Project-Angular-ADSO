
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface Categoria {
  idCategoria?: number;
  nomCategoria: string;
  descripcion: string;
  estado: boolean;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  idUsuarioCreacion?: number;
  idUsuarioModificacion?: number;

  // categoria: Categoria[]
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registrarCategoria(categoria: Categoria): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.crearCategorias}`, categoria);
  }

  listarCategorias(): Observable<Categoria[]> {
  return this.http.post<Categoria[]>(`${this.apiUrl}${environment.listarCategorias}`,null)
    // .pipe(map(response => response.productos));
}

  eliminarCategoriasPorIds(ids: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}${environment.eliminarCategorias}`, ids);
  }

  obtenerCategoriaPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}${environment.obtenerCategoriaPorId}?idCategoria=${id}`);
  }
  
  actualizarCategoria(categoria: Categoria): Observable<any> {
    return this.http.put(`${this.apiUrl}${environment.actualizarCategorias}`, categoria);
  }
}
