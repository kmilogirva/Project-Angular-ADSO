import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/shared/models/Usuario';
import { JwtPayload, jwtDecode } from 'jwt-decode';

interface MyJwtPayload extends JwtPayload {
  IdUsuario?: string; // Asegúrate de que este sea el nombre correcto en el token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseServerUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('usuario');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // =======================
  // Login y Registro
  // =======================

  login(datosLogin: any): Observable<any> {
    return this.http.post(`${this.baseServerUrl + environment.loginUsuario}`, datosLogin);
  }

  registerUser(usuario: Usuario): Observable<{ exitoso: boolean; mensaje: string }> {
    return this.http.post<{ exitoso: boolean; mensaje: string }>(
      this.baseServerUrl + environment.crearUsuario,
      usuario
    ).pipe(
      catchError(error => {
        if (error.status === 409) {
          return throwError(() => ({ exitoso: false, mensaje: 'El Usuario ya existe' }));
        }
        return throwError(() => ({ exitoso: false, mensaje: 'Error de conexión con el servidor' }));
      })
    );
  }

  // =======================
  // Token y Usuario actual
  // =======================

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getDecodedToken(): MyJwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<MyJwtPayload>(token);
    } catch (e) {
      console.error('Error decodificando token', e);
      return null;
    }
  }

  obtenerIdUsuario(): string | null {
    const payload = this.getDecodedToken();
    return payload?.IdUsuario || null;
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUserValue;
  }

  // =======================
  // Logout
  // =======================

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
  }
}
