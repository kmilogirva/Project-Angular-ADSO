// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,
  
//   espanol: {
//     processing: "Procesando...",
//     search: "Buscar:",
//     searchPlaceholder: "Buscar...",
//     lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
//     info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
//     infoEmpty: "Mostrando ningún elemento.",
//     infoFiltered: "(filtrado _MAX_ elementos total)",
//     infoPostFix: "",
//     loadingRecords: "Cargando registros...",
//     zeroRecords: "No se encontraron registros",
//     emptyTable: "No hay datos disponibles en la tabla",
//     paginate: {
//       first: "Primero",
//       previous: "Anterior",
//       next: "Siguiente",
//       last: "Último",
//     },
//     aria: {
//       sortAscending: ": Activar para ordenar la tabla en orden ascendente",
//       sortDescending: ": Activar para ordenar la tabla en orden descendente",
//     },
// },

 //Inicio Conexión Api y Variables 

 apiUrl: "https://localhost:44374/api/", // backend pruebas

//Inicio Usuario

 loginUsuario: "Seguridad/InicioSesion",
 crearRol: "Seguridad/crearrol",
 crearUsuario: 'User/CrearUsuario'

//Inicio Productos

,obtenerListadoProductos: "productos/listarproductos"
,obtenerProductoPorId: "productos/obtenerproductoporid"
,registrarProductos: "productos/registrarproducto"
,actualizarProducto: "productos/actualizarproducto"
// ,crearUsuario: 'User/CreateUsers'


};


