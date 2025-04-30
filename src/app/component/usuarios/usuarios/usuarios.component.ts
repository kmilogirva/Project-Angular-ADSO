import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/Autenticacion/auth.service';
import { Usuario } from 'src/app/shared/models/Usuario';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, SidebarComponent]

})
export class UsuariosComponent implements OnInit  {
    title = 'proyecto1';
    usuarioForm!: FormGroup;
    repetircontrasena: string = 'none';
    cuentaCreada :boolean = false;
    displayMsg: string ='';
    // Nombres:

    // idUsuario: number [] = [];
    // ch: string[] = [];
    // id : string[] = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar'];
    // cantidad : number[] = [];
    // ubicacion : string ='';
    // precio : number[] = []

    // es relevante en angular metod para hacer inyeccion de depencias
  constructor(private fb: FormBuilder,
      private  authService : AuthService,
      private toastr: ToastrService) {  }
// toastr muestra mesajes personalizado para alguna accion bien echa dentro del front
  ngOnInit(): void {
    this.instanciarFormulario();
    // this.inicializarDataTable();
  }



  instanciarFormulario() : void{
      this.usuarioForm = this.fb.group({
        nombre: ["", [Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
        apellidos: ["", [Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]],
        correo: ["", [Validators.required,Validators.email]],
        telefono: ["", [Validators.required,Validators.pattern("[0-9]*"),Validators.minLength(10),Validators.maxLength(10)]],
        sexo: ["", [Validators.required]],
        contrasena: ["", [Validators.required,Validators.minLength(6),Validators.maxLength(15),]],
        confirmarcontraseña: [""],
        repetircontrasena: [""]
      })
    }

    get f(){
      return this.usuarioForm.controls;

    }

    registerSubmited() {
      if (this.f['contrasena'].value === this.f['confirmarcontrasena'])
      {
        this.repetircontrasena = 'none';

        const usuario: Usuario = {
          nombres: this.f['nombres']?.value,
          apellidos: this.f['apellidos']?.value,
          correo: this.f['correo']?.value,
          telefono: this.f['telefono']?.value,
          sexo: this.f['sexo']?.value,
          contraseña: this.f['contraseña']?.value,
          rol: ['Admin', 'Auxiliar']
        };

        this.authService.registerUser(usuario).subscribe(
          (response) =>{
          if (response.exitoso){
            this.toastr.success (response.mensaje)
            this.cuentaCreada =true;
            this.usuarioForm.reset();
            this.repetircontrasena = 'none';
          } else {
            this.toastr.error(response.mensaje);
            this.cuentaCreada = false;
          }
        },
        (error) => {
          console.error("Error en la llamada al backend:", error);
          this.toastr.error(error.mensaje);
          this.cuentaCreada = false;
        }
      );
    } else {
      this.repetircontrasena = 'inline';
    }
  }

}
