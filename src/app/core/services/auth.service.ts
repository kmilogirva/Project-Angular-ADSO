import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/shared/models/Usuario';
import { RolesPermisosAccion } from 'src/app/models/modulos/RolesPermisosAccion';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Roles } from 'src/app/shared/models/roles.model';
import { ComboResponse } from 'src/app/models/Response/Generales/ComboResponse';

// Interfaces
interface MyJwtPayload extends JwtPayload {
  IdUsuario?: string;
}

interface SubModuloDTO {
  NombreSubModulo: string;
  IconSubModulo: string;
  Ruta: string;
}

interface ModuloDTO {
  NombreModulo: string;
  IconModulo: string;
  items: SubModuloDTO[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseServerUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;
  private userPermissionsSubject: BehaviorSubject<RolesPermisosAccion[]>;

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('usuario');
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
    const savedPermissions = localStorage.getItem('permisos');
    this.userPermissionsSubject = new BehaviorSubject<RolesPermisosAccion[]>(
      savedPermissions ? JSON.parse(savedPermissions) : []
    );
  }
  
  // ==========================================================
  // LÓGICA DE PERMISOS (con depuración)
  // ==========================================================

  cargarYCachearPermisos(): Observable<RolesPermisosAccion[]> {
    const usuario = this.currentUserSubject.value;
    const idRol = usuario?.idRol; 

    if (!idRol) {
      console.error("No se pudo encontrar idRol en el usuario para cargar permisos.");
      return of([]); 
    }

    const endpoint = `${this.baseServerUrl}${environment.consultarpermisosaccionporrol}/${idRol}`;
    
    return this.http.get<RolesPermisosAccion[]>(endpoint).pipe(
      tap(permisos => {
        localStorage.setItem('permisos', JSON.stringify(permisos));
        this.userPermissionsSubject.next(permisos);
        console.log('Permisos cargados y cacheados:', permisos);
      })
    );
  }

  public hasPermission(nombreSubModulo: string, accion: 'leer' | 'crear' | 'editar' | 'eliminar'): boolean {
    console.log(`--- INICIA VERIFICACIÓN DE PERMISO ---`);
    console.log(`[HTML] Pide permiso para el submódulo: "${nombreSubModulo}"`);

    const permisosActuales = this.userPermissionsSubject.value;
    console.log('[SERVICIO] Permisos disponibles en caché:', permisosActuales);

    const permisoDelSubmodulo = permisosActuales.find(p => p.nombreSubModulo === nombreSubModulo);
    
    if (!permisoDelSubmodulo) {
        console.error(`[FALLO] No se encontró una coincidencia exacta para el nombre "${nombreSubModulo}". Revisa mayúsculas, minúsculas, acentos o espacios.`);
        console.log(`--- FIN DE VERIFICACIÓN ---`);
        return false;
    }

    const tienePermiso = permisoDelSubmodulo[accion] === 1;
    console.log(`[EVALUACIÓN] Para "${nombreSubModulo}", ¿la acción "${accion}" es 1?`, tienePermiso);
    console.log(`--- FIN DE VERIFICACIÓN ---`);
    return tienePermiso;
  }

  // ==========================================================
  // LÓGICA ORIGINAL RESTAURADA
  // ==========================================================
  
  public setCurrentUser(usuario: Usuario): void {
    this.currentUserSubject.next(usuario);
  }

  public get usuarioActual(): Usuario | null {
    return this.currentUserSubject.value;
  }
  
  login(datosLogin: any): Observable<any> {
    return this.http.post(`${this.baseServerUrl}${environment.loginUsuario}`, datosLogin);
  }

  crearRol(datosLRol: any): Observable<any> {
    return this.http.post(`${this.baseServerUrl}${environment.crearRol}`, datosLRol);
  }

  obtenerComboRoles(): Observable<ComboResponse[]> {
    return this.http.get<ComboResponse[]>(`${this.baseServerUrl}${environment.obtenerComboRoles}`);
  }

  obtenerPermisosRolesAcciones(idRol: number): Observable<RolesPermisosAccion[]> {
    return this.http.get<RolesPermisosAccion[]>(`${this.baseServerUrl}${environment.consultarpermisosaccionporrol}/${idRol}`);
  }

  guardarPermisosRolesAcciones(rolesPermisosAcciones :RolesPermisosAccion[]){
    return this.http.post<RolesPermisosAccion[]>(`${this.baseServerUrl}${environment.registrarPermisosRolesAcciones}`, rolesPermisosAcciones);
  }

  obtenerMenuPorRol(idRol: number): Observable<ModuloDTO[]> {
    return this.http.post<ModuloDTO[]>(`${this.baseServerUrl}${environment.obtenerMenuPorRol}/${idRol}`, null);
  }
  
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
    return this.getDecodedToken()?.IdUsuario ?? null;
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    if (!this.currentUserValue) {
      const savedUser = localStorage.getItem('usuario');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
    return true;
  }
  
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('usuario');
    localStorage.removeItem('permisos');
    this.userPermissionsSubject.next([]);
    this.currentUserSubject.next(null);
  }
  
  obtenerRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.baseServerUrl}seguridad/listaroles`);
  }
  
  actualizarRol(id: number, rol: Roles): Observable<any> {
    return this.http.put<any>(`${this.baseServerUrl}seguridad/roles/${id}`, rol);
  }

  eliminarRol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseServerUrl}seguridad/roles/${id}`);
  }
}