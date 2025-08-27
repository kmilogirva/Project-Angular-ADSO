import { Routes } from "@angular/router";
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
// export default [
{
  path: 'acceso',
  loadComponent: () =>
      import('../component/seguridad/login/login.component').then((m) => m.LoginComponent)
},
{
  path: '',
  redirectTo: 'acceso',
  pathMatch: 'full'
},
{
  path: 'inicio',
   canActivate: [authGuard],
   loadComponent: () =>
  import('../shared/components/inicio/inicio.component').then(m => {
    console.log('DEBUG m=', m);    // debería mostrar { InicioComponent: class … }
    return m.InicioComponent;
  })
},
{
  path: 'crear-usuario',
   canActivate: [authGuard],
    loadComponent: () =>
      import('../component/gestionusuarios/registrousuarios/registrousuario.component').then((m) => m.RegistroUsuariosComponent)
},

{
  path: 'crear-roles',
   canActivate: [authGuard],
    loadComponent: () =>
      import('../component/seguridad/creacionroles/creacionroles.component').then((m) => m.CreacionrolesComponent)
},

{
  path: 'crear-productos',
   canActivate: [authGuard],
    loadComponent: () =>
      import('../component/gestionproductos/productos/productos.component').then((m) => m.ProductosComponent)
},
{
  path: 'bodegas',
   canActivate: [authGuard],
    loadComponent: () =>
      import('../component/bodegas/bodegas.component').then((m) => m.BodegasComponent)
},
{
  path: 'categorias',
   canActivate: [authGuard],
    loadComponent: () =>
      import('../component/categorias/categorias.component').then((m) => m.CategoriasComponent)
},
{
  path: 'configuracion',
   canActivate: [authGuard],
  loadComponent: () =>
      import('../component/configuracion/configuracion.component').then((m) => m.ConfiguracionComponent)
},
{
  path: 'permisos',
   canActivate: [authGuard],
  loadComponent: () =>
      import('../component/permisos/permisos.component').then((m) => m.PermisosComponent)
},

{
  path: 'stock',
   canActivate: [authGuard],
  loadComponent: () => import('../component/stock/stock.component').then(m => m.StockComponent)
},
{

  path: 'recepcion',
   canActivate: [authGuard],
  loadComponent: () => import('../component/recepcion/recepcion.component').then(m => m.RecepcionComponent)
},
{
  path: 'devoluciones',
   canActivate: [authGuard],
  loadComponent: () => import('../component/devoluciones/devoluciones.component').then(m => m.DevolucionesComponent)
},
{
  path: 'reportes',
   canActivate: [authGuard],
  loadComponent: () => import('../component/reportes/reportes.component').then(m => m.ReportesComponent)
},
{
  path: 'auditoria',
   canActivate: [authGuard],
  loadComponent: () => import('../component/auditoria/auditoria.component').then(m => m.AuditoriaComponent)
},
{
  path: 'notificaciones',
   canActivate: [authGuard],
  loadComponent: () =>
      import('../component/notificaciones/notificaciones.component').then((m) => m.NotificacionesComponent)
},
{
  path: 'configurar-submodulos',
   canActivate: [authGuard],
  loadComponent: () =>
      import('../component/seguridad/gestionmodulos/submodulos/submodulos.component').then((m) => m.SubmodulosComponent)
},
{
  path: 'configurar-modulos',
   canActivate: [authGuard],
  loadComponent: () =>
      import('../component/seguridad/gestionmodulos/modulos/modulos.component').then((m) => m.ModulosComponent)
},
{
  path: 'asignacion-permisos-roles',
   canActivate: [authGuard],
  loadComponent: () =>
      import('../component/seguridad/asignacionpermisosroles/asignacionpermisosroles.component').then((m) => m.AsignacionpermisosrolesComponent)
},
{
  path: 'gestion-terceros',
   canActivate: [authGuard],
  loadComponent: () =>
      import('../component/gestionusuarios/registroterceros/registroterceros.component').then((m) => m.RegistrotercerosComponent)
}

] as Routes;