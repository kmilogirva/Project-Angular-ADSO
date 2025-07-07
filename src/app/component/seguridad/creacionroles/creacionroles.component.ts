import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-creacionroles',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SidebarComponent],
  templateUrl: './creacionroles.component.html',
  styleUrl: './creacionroles.component.scss'
})
export class CreacionrolesComponent implements OnInit{
 rolesForm!: FormGroup;

 constructor(private fb: FormBuilder, 
  private authService: AuthService,
private toastr: ToastrService){
 }

  instanciarFormulario(): void {
    this.rolesForm = this.fb.group({
      IdRol:[''],
      NombreRol:['',Validators.required],
      IdEstado:[false,Validators.required],
      IdUsuarioCreacion: ['']
    })
  }

   get f() {
    return this.rolesForm.controls;
  }

  ngOnInit(): void {
    this.instanciarFormulario();
  }

onSubmit() {
  if (this.rolesForm.invalid) return;
const idUsuario = this.authService.obtenerIdUsuario();

this.rolesForm.patchValue({ IdUsuarioCreacion: idUsuario });
  const nuevoRol = this.rolesForm.value;
  console.log('Rol a insertar:', nuevoRol);
    this.authService.crearRol(nuevoRol).subscribe({
      next:(response) => {
        if (response.exitoso){
          this.toastr.success(response.mensaje);
          this.rolesForm.reset();
        }else{
          this.toastr.error(response.mensaje)
        }
      },
      error: () => {
        this.toastr.error('Error al registrar el rol');
      }
    })
  // Si quieres limpiar el formulario después de visualizar los datos:
  // this.rolesForm.reset({ IdEstado: true });
}

}
