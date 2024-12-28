import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './component/usuarios/usuarios/usuarios.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProductosComponent } from './component/productos/productos.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'menu', component: MenuComponent},
  {path: 'usuarios', component: UsuariosComponent },
  {path: 'productos', component: ProductosComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

  
 
})
export class AppRoutingModule { }
