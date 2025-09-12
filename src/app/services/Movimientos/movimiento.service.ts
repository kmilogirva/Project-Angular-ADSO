import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movimiento } from 'src/app/models/movimientos/Movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private http: HttpClient;
  baseServerUrl = environment.apiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /** Registrar nuevo movimiento (entrada/salida) */
  registrarMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    const url = `${this.baseServerUrl}${environment.registrarMovimiento}`;
    console.log('Services Movimiento - registrar');
    return this.http.post<Movimiento>(url, movimiento).pipe(
      catchError((error) => {
        console.error('Error en registrarMovimiento', error);
        return throwError(() => error);
      })
    );
  }

  /** Actualizar un movimiento existente */
  actualizarMovimiento(movimiento: Movimiento): Observable<Movimiento> {
    console.log("Datos de actualizarMovimiento", movimiento);
    const url = `${this.baseServerUrl}${environment.actualizarMovimiento}`;
    return this.http.put<Movimiento>(url, movimiento).pipe(
      catchError((error) => {
        console.error('Error en actualizarMovimiento', error);
        return throwError(() => error);
      })
    );
  }

  /** Listar todos los movimientos */
  obtenerListadoMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(
      `${this.baseServerUrl}${environment.obtenerListadoMovimientos}`
    ).pipe(
      catchError((error) => {
        console.error('Error en obtenerListadoMovimientos', error);
        return throwError(() => error);
      })
    );
  }

  /** Obtener movimiento por ID */
  obtenerMovimientoPorId(id: number): Observable<Movimiento> {
    return this.http.get<Movimiento>(
      `${this.baseServerUrl}${environment.obtenerMovimientoPorId}`,
      { params: { idMovimiento: id } }
    ).pipe(
      catchError((error) => {
        console.error('Error en obtenerMovimientoPorId', error);
        return throwError(() => error);
      })
    );
  }

  /** Eliminar movimiento */
  eliminarMovimiento(idMovimiento: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseServerUrl}${environment.eliminarMovimiento}/${idMovimiento}`
    ).pipe(
      catchError((error) => {
        console.error('Error en eliminarMovimiento', error);
        return throwError(() => error);
      })
    );
  }
}
