import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
// import { TablaClientesComponent } from './tabla-cliente/tabla-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboResponse } from 'src/app/models/Response/Generales/ComboResponse';
import { UsuarioService } from 'src/app/services/usuarios/usuarios.service';
// import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Tercero } from 'src/app/models/terceros/Tercero';
import { TablaTercerosComponent } from './tabla-terceros/tabla-terceros.component';

@Component({
  selector: 'app-registroterceros',
  standalone: true,
  imports: [CommonModule,SidebarComponent, FormsModule,
    ReactiveFormsModule,TablaTercerosComponent],
  templateUrl: './registroterceros.component.html',
  styleUrl: './registroterceros.component.scss'
})
export class RegistrotercerosComponent implements OnInit{
 terceroForm!: FormGroup;
  // clientes: any[] = [];
  tiposIdentificacion: ComboResponse[] = [];
  tiposPersona: ComboResponse[] = [];
  paises: ComboResponse[] = [];
  departamentos: ComboResponse[] = [];
  ciudades: ComboResponse[] = [];
  tiposTercero: ComboResponse[] = [];

  terceros : Tercero[] =[];

  constructor(private fb: FormBuilder, private authService: AuthService, private usuarioService: UsuarioService, private toastr: ToastrService, ) { }

  ngOnInit(): void {
 this.instanciarFormulario();
 this.obtenerComboTiposDocumentoIdentidad();
 this.obtenerComboTiposDocumentoTercero();
 this.obtenerComboTiposPersona();
 this.obtenerComboPaises();
 this.cargarDataTerceros();
  // console.log(this.terceroForm.value);
  // console.log(this.terceroForm.valid);
  // console.log(this.terceroForm.errors);
  // console.log(this.terceroForm);
  }

  
  instanciarFormulario(){
    this.terceroForm = this.fb.group({
      idTercero:[null],
      codDocumento: ['', Validators.required],
      idTipoIdentificacion: ['', Validators.required],
      idTipoPersona:['',Validators.required],
      nombre1: ['', Validators.required],
      nombre2: [''],
      apellido1: ['', Validators.required],
      apellido2: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      direccion: ['', Validators.required],
      idPais:['', Validators.required],
      idDepartamento:['', Validators.required],
      idCiudad:['',Validators.required],
      idTipoTercero: ['', Validators.required],
      idEstado: [1, Validators.required],
      idUsuarioCreacion: [null],
      idUsuarioModificacion: [null]
    })
  }

  get f(){
    return this.terceroForm.controls;
  }

  obtenerComboTiposDocumentoIdentidad(){
    this.usuarioService.obtenerComboTiposDocumento().subscribe({
      next: (data: ComboResponse[]) =>{
        this.tiposIdentificacion = data;
      },
     error: () => this.toastr.error('No se pudo cargar la data de la tabla')
    })
  }

  obtenerComboTiposDocumentoTercero(){
    this.usuarioService.obtenerComboTiposTercero().subscribe({
      next: (data: ComboResponse[]) =>{
        this.tiposTercero = data;
      },
     error: () => this.toastr.error('No se pudo cargar la data de la tabla')
    })
  }

    obtenerComboTiposPersona(){
    this.usuarioService.obtenerComboTiposPersona().subscribe({
      next: (data: ComboResponse[]) =>{
        this.tiposPersona = data;
      },
     error: () => this.toastr.error('No se pudo cargar la data de la tabla')
    })
  }

  obtenerComboPaises(){
    this.usuarioService.obtenerComboPaises().subscribe({
      next: (data: ComboResponse[]) =>{
        this.paises = data;
      },
     error: () => this.toastr.error('No se pudo cargar la data de la tabla')
    })
  }

  obtenerComboDepartamentos(idPais: number) {
  this.usuarioService.obtenerComboDepartamentos(idPais).subscribe({
    next: (data: ComboResponse[]) => {
      this.departamentos = data;
      this.ciudades = []; // limpiar ciudades al cambiar país
    },
    error: () => this.toastr.error('No se pudo cargar la data de la tabla')
  });
}

obtenerComboCiudades(idDepartamento: number) {
  this.usuarioService.obtenerComboCiudades(idDepartamento).subscribe({
    next: (data: ComboResponse[]) => {
      this.ciudades = data;
    },
    error: () => this.toastr.error('No se pudo cargar la data de la tabla')
  });
}

  cargarDataTerceros() {
    this.usuarioService.obtenerListadoTercero().subscribe({
      next: (terceros) => {
        console.log(terceros)
        this.terceros = terceros
      },
      error: () => this.toastr.error('No se pudo cargar la datos de la tabla Terceros')
    })
  }





  onEstadoToggle(event: any): void {
    const checked = event.target.checked;
    this.terceroForm.patchValue({ idEstado: checked ? 1 : 0 });
  }


  registrarTercero(): void {
    if (this.terceroForm.invalid) return;

    const esEdicion = this.terceroForm.value.idTercero != null;
    console.log(esEdicion)
  
    const idUsuario = this.authService.obtenerIdUsuario();

    if (!esEdicion) {
      this.terceroForm.patchValue({ idUsuarioCreacion: Number(idUsuario) });
    } else {
      this.terceroForm.patchValue({ idUsuarioModificacion: Number(idUsuario) });
    }

    let dto: Tercero = {
    ...(this.terceroForm.value as Partial<Tercero>),
  idTercero: Number(this.terceroForm.value.idTercero) || undefined,
  nombre1: this.terceroForm.value.nombre1 || '',
  nombre2: this.terceroForm.value.nombre2 || '',
  apellido1: this.terceroForm.value.apellido1 || '',
  apellido2: this.terceroForm.value.apellido2 || '',
  idTipoIdentificacion: Number(this.terceroForm.value.idTipoIdentificacion),
  codDocumento : this.terceroForm.value.codDocumento  || '',
  idTipoTercero: Number(this.terceroForm.value.idTipoTercero),
  idTipoPersona: Number(this.terceroForm.value.idTipoPersona),
  idPais: Number(this.terceroForm.value.idPais),
  idDepartamento: Number(this.terceroForm.value.idDepartamento),
  idCiudad: Number(this.terceroForm.value.idCiudad),
  direccion: this.terceroForm.value.direccion,
  telefono: this.terceroForm.value.telefono,
  email: this.terceroForm.value.email,
  idEstado: Number(this.terceroForm.value.idEstado),
  idUsuarioCreacion: Number(this.terceroForm.value.idUsuarioCreacion),
  idUsuarioModificacion: this.terceroForm.value.idUsuarioModificacion
    ? Number(this.terceroForm.value.idUsuarioModificacion)
    : undefined
};

  for (const key in dto) {
    const value = dto[key as keyof Tercero];
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      delete dto[key as keyof Tercero];
    }
  }

    console.log(dto)
    const accion = esEdicion
      ? this.usuarioService.actualizarTercero(dto)
      : this.usuarioService.crearTercero(dto);

    accion.subscribe({
      next: (res) => {
        console.log("Respuesta:", res);
        this.toastr.success(
          esEdicion ? 'Tercero actualizado correctamente' : 'Tercero registrado correctamente'
        );
        this.cargarDataTerceros();
        this.terceroForm.reset();
        // this.repetircontrasena = 'none';
      },
      error: (err) => {
        console.error("Error en la petición", err);
        this.toastr.error('Error al procesar la solicitud');
      }
    });
  }
  
   llenarCamposFormulario(id: number): void {
    console.log("Entre al metodo llenarCamposFormulario()", id)
    if (!id) {
      this.toastr.warning('ID no válido');
      return;
    }

    this.usuarioService.obtenerTerceroPorId(id).subscribe({
      next: (tercero) => {
        console.log(tercero)
        this.terceroForm.patchValue({
          idTercero: tercero.idTercero,
          codDocumento : tercero.codDocumento,
          idTipoIdentificacion : tercero.tipoIdentificacion.idTipoDocumento,
          idTipoPersona: tercero.tipoPersona.idTipoPersona,
          idTipoTercero: tercero.tipoTercero.idTipoTercero,
          nombre1: tercero.nombre1,
          nombre2: tercero.nombre2,
          apellido1: tercero.apellido1,
          apellido2: tercero.apellido2,
          email: tercero.email,
          telefono: tercero.telefono,
          direccion : tercero.direccion,
          idPais: tercero.idPais,
          idDepartamento: tercero.idDepartamento,
          idCiudad: tercero.idCiudad,
          idEstado: tercero.idEstado,
          idUsuarioCreacion: tercero.idUsuarioCreacion,
          idUsuarioModificacion: tercero.idUsuarioModificacion,
        });
        console.log(tercero.idPais, tercero.idDepartamento)
        this.obtenerComboDepartamentos(tercero.idPais);
        this.obtenerComboCiudades(tercero.idDepartamento);
      },
      error: () => this.toastr.error('No se pudo obtener el usuario')
    });
  }


   eliminarTercero(idTercero: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este tercero?')) {
      this.usuarioService.eliminarTerceroPorId(idTercero).subscribe({
        next: (response) => {
          this.toastr.success(response.mensaje);
          this.cargarDataTerceros(); // Refrescar lista
        },
        error: (err) => {
          this.toastr.error(err.error.mensaje || 'Error al eliminar el tercero');
        }
      });
    }
  }
}

