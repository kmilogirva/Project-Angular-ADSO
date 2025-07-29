// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,


 //Inicio Conexión Api y Variables 

 apiUrl: "https://localhost:44374/api/", // backend pruebas

//Inicio Usuario

 loginUsuario: "Seguridad/InicioSesion",
 crearRol: "Seguridad/crearrol",
 obtenerComboRoles: "Seguridad/combo-roles",
 crearUsuario: 'User/crearusuario',
 obtenerListadoUsuarios: "User/listarusuarios"
 ,obtenerUsuarioPorId: "User/obtenerusuarioporid"
 ,actualizarUsuarioPorId: "User/actualizarusuario"
 ,eliminarUsuarioPorId:"User/eliminarusuarioporid"

//Inicio Productos

,obtenerListadoProductos: "productos/listarproductos"
,obtenerProductoPorId: "productos/obtenerproductoporid"
,registrarProductos: "productos/registrarproducto"
,actualizarProducto: "productos/actualizarproducto"
// ,crearUsuario: 'User/CreateUsers'


};


