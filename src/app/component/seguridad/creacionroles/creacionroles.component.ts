import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { Roles } from  'src/app/shared/models/roles.model';

@Component({
  selector: 'app-creacionroles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './creacionroles.component.html',
  styleUrl: './creacionroles.component.scss'
})
export class CreacionrolesComponent implements OnInit {
  rolesForm!: FormGroup;
  rolesList: Roles[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  instanciarFormulario(): void {
    this.rolesForm = this.fb.group({
      IdRol:[''],
      NombreRol:['', Validators.required],
      IdEstado:[false, Validators.required],
      IdUsuarioCreacion: ['']
    });
  }

  get f() {
    return this.rolesForm.controls;
  }

  ngOnInit(): void {
    this.instanciarFormulario();
    this.cargarRoles();
  }

  cargarRoles() {
    this.loading = true;
    this.authService.obtenerRoles().subscribe({
      next: (roles) => {
        console.log('Roles cargados:', roles);
        this.rolesList = roles;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Error al cargar roles');
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.rolesForm.invalid) return;

    const idUsuario = this.authService.obtenerIdUsuario();
    this.rolesForm.patchValue({ IdUsuarioCreacion: idUsuario });

    const nuevoRol = this.rolesForm.value;
    this.authService.crearRol(nuevoRol).subscribe({
      next: (response) => {
        if (response.exitoso) {
          this.toastr.success(response.mensaje);
          this.rolesForm.reset();
          this.cargarRoles(); // Recargar la lista después de crear
        } else {
          this.toastr.error(response.mensaje);
        }
      },
      error: () => {
        this.toastr.error('Error al registrar el rol');
      }
    });
  }

  editarRol(rol: Roles) {
    // Lógica para editar (se implementará después)
    console.log('Editar rol:', rol);
  }

  eliminarRol(id: number) {
    // Lógica para eliminar (se implementará después)
    console.log('Eliminar rol con id:', id);
  }
}
