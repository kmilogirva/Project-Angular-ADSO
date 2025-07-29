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
      idRol:[''],
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

  this.authService.crearRol(nuevoRol).subscribe({
    next: (response) => {
      this.toastr.success(response.mensaje);
      this.rolesForm.reset();
    },
    error: (err) => {
      if (err.status === 409) {
        this.toastr.warning(err.error.mensaje);
      } else {
        this.toastr.error('Error al registrar el rol');
      }
    }
  });
}


}
