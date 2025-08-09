import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/shared/models/Usuario';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Roles } from 'src/app/shared/models/roles.model';
import { ComboResponse } from 'src/app/models/Response/Generales/ComboResponse';
import { RolesPermisosAccion } from 'src/app/models/modulos/RolesPermisosAccion';


interface MyJwtPayload extends JwtPayload {
  IdUsuario?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // #region 🔧 Propiedades – estado y configuración
  private readonly baseServerUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;
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


  public get usuarioActual(): Usuario | null {
  return this.currentUserSubject.value;
}
  // #region 🔐 Autenticación (Login / Registro)
  
  login(datosLogin: any): Observable<any> {
    return this.http.post(
      `${this.baseServerUrl}${environment.loginUsuario}`,
      datosLogin
    );
  }
  // #endregion

  // #region 🪪 Token – obtención y decodificación
=======
   // #region 🔐 Autenticación (Login / Registro)
  crearRol(datosLRol: any): Observable<any> {
    return this.http.post(
      `${this.baseServerUrl}${environment.crearRol}`,
      datosLRol
    );
  }

    obtenerComboRoles(): Observable<ComboResponse[]> {
    return this.http.get<ComboResponse[]>( `${this.baseServerUrl}${environment.obtenerComboRoles}`,);
  }
  // #endregion

  obtenerPermisosRolesAcciones(idRol: number): Observable<RolesPermisosAccion[]> {
    return this.http.get<RolesPermisosAccion[]>(`${this.baseServerUrl}${environment.consultarpermisosaccionporrol}/${idRol}`,);
  }

  guardarPermisosRolesAcciones(rolesPermisosAcciones :RolesPermisosAccion[]){
    return this.http.post<RolesPermisosAccion[]>(`${this.baseServerUrl}${environment.registrarPermisosRolesAcciones}`,rolesPermisosAcciones);
  }


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

  // #region 👤 Usuario actual
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

  // #region 🔓 Cierre de sesión
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('usuario');
    this.currentUserSubject.next(null);
  }
  // #endregion

  // #region 🛠️ Métodos para Roles
  obtenerRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(
      `${this.baseServerUrl}seguridad/listaroles`
    );
  }

  crearRol(rol: Roles): Observable<any> {
    // Devuelve exactamente lo que manda el backend: { mensaje, rol }
    return this.http.post<any>(
      `${this.baseServerUrl}seguridad/crearrol`,
      rol
    );
  }

  // Estos métodos se usarán cuando el backend tenga implementados los endpoints:
  obtenerRolPorId(id: number): Observable<Roles> {
    return this.http.get<Roles>(
      `${this.baseServerUrl}seguridad/roles/${id}`
    );
  }

  // actualizarRol(id: number, rol: Roles): Observable<any> {
  //   return this.http.put<any>(
  //     `${this.baseServerUrl}seguridad/roles/${id}`,
  //     rol
  //   );
  // }
  actualizarRol(id: number, rol: Roles): Observable<any> {
  return this.http.put<any>(
    `${this.baseServerUrl}seguridad/roles/${id}`,
    rol
  );
}

  eliminarRol(id: number): Observable<any> {
  return this.http.delete<any>(
    `${this.baseServerUrl}seguridad/roles/${id}`
  );
}
  // #endregion
}
