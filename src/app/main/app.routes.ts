import { Routes } from "@angular/router";

export const routes: Routes = [
// export default [
{
  path: 'acceso',
  loadComponent: () =>
      import('../component/login/login.component').then((m) => m.LoginComponent)
},
{
  path: '',
  redirectTo: 'acceso',
  pathMatch: 'full'
},
{
  path: 'usuario',
    loadComponent: () =>
      import('../component/usuarios/usuarios.component').then((m) => m.UsuariosComponent)
},
{
  path: 'productos',
    loadComponent: () =>
      import('../component/productos/productos.component').then((m) => m.ProductosComponent)
},
{
  path: 'bodegas',
    loadComponent: () =>
      import('../component/bodegas/bodegas.component').then((m) => m.BodegasComponent)
},
{
  path: 'categorias',
    loadComponent: () =>
      import('../component/categorias/categorias.component').then((m) => m.CategoriasComponent)
},
{
  path: 'configuracion',
  loadComponent: () =>
      import('../component/configuracion/configuracion.component').then((m) => m.ConfiguracionComponent)
},
{
  path: 'permisos',
  loadComponent: () =>
      import('../component/permisos/permisos.component').then((m) => m.PermisosComponent)
},
{
  path: 'modulos',
  loadComponent: () =>
      import('../component/modulos/modulos.component').then((m) => m.ModulosComponent)
},
{
  path: 'stock',
  loadComponent: () => import('../component/stock/stock.component').then(m => m.StockComponent)
},
{
  path: 'notificaciones',
  loadComponent: () =>
      import('../component/notificaciones/notificaciones.component').then((m) => m.NotificacionesComponent)
}

] as Routes;