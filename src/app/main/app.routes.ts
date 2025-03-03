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
  path: 'registro',
    loadComponent: () =>
      import('../component/register/register.component').then((m) => m.RegisterComponent)
},
{
  path: 'productos',
    loadComponent: () =>
      import('../component/productos/productos.component').then((m) => m.ProductosComponent)
}
] as Routes;