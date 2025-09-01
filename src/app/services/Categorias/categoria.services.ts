import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/categorias/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseServerUrl = environment.apiUrl;
  private categoriasApiUrl = `${this.baseServerUrl}Categorias`;

  constructor(private http: HttpClient) {}

  // Listar todas las categorías
  // GET: /api/Categorias
  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasApiUrl);
  }

  // Crear una nueva categoría
  // POST: /api/Categorias
  registrarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriasApiUrl, categoria);
  }

  // Actualizar categoría existente
  // PUT: /api/Categorias/{id}
  actualizarCategoria(idCategoria: number, categoria: Categoria): Observable<any> {
    const url = `${this.categoriasApiUrl}/${idCategoria}`;
    return this.http.put(url, categoria);
  }

  // Obtener categoría por ID
  // GET: /api/Categorias/{id}
  obtenerCategoriaPorId(idCategoria: number): Observable<Categoria> {
    const url = `${this.categoriasApiUrl}/${idCategoria}`;
    return this.http.get<Categoria>(url);
  }

  // Eliminar una categoría por ID
  // DELETE: /api/Categorias/{id}
  eliminarCategoriasPorIds(ids: number[]): Observable<any> {
    const id = ids[0];
    const url = `${this.categoriasApiUrl}/${id}`;
    return this.http.delete(url);
  }
}