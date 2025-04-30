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
      import('../component/usuarios/usuarios/usuarios.component').then((m) => m.UsuariosComponent)
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
}
] as Routes;
