import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/shared/models/Usuario';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Roles } from 'src/app/shared/models/roles.model';

interface MyJwtPayload extends JwtPayload {
  IdUsuario?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  obtenerRoles(): Observable<Roles[]> {
  return this.http.get<Roles[]>(
    `${this.baseServerUrl}seguridad/listaroles` // Ajusta la ruta si es diferente
  );
}

  // #region 🔧 Propiedades – estado y configuración
  private readonly baseServerUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public  currentUser:        Observable<Usuario | null>;
  // #endregion

  // #region 🚀 Constructor
  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('usuario');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  // #endregion

  // #region 🔐 Autenticación (Login / Registro)
  login(datosLogin: any): Observable<any> {
    return this.http.post(
      `${this.baseServerUrl}${environment.loginUsuario}`,
      datosLogin
    );
  }
  // #endregion

   // #region 🔐 Autenticación (Login / Registro)
  crearRol(datosLRol: any): Observable<any> {
    return this.http.post(
      `${this.baseServerUrl}${environment.crearRol}`,
      datosLRol
    );
  }
  // #endregion

  // #region 🪪 Token – obtención y decodificación
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
  // #endregion

  // #region 👤 Usuario actual
  obtenerIdUsuario(): string | null {
    return this.getDecodedToken()?.IdUsuario ?? null;
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUserValue;
  }
  // #endregion

  // #region 🔓 Cierre de sesión
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
  }
  // #endregion


}
