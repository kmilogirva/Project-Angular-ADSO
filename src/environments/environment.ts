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


//Inicio Seguridad
 loginUsuario: "Seguridad/InicioSesion",
 crearRol: "Seguridad/crearrol",
 obtenerlistadoRoles: "Seguridad/obtenerlistadoroles",
 crearUsuario: 'User/CrearUsuario',
 obtenerComboRoles: "Seguridad/combo-roles",
 consultarpermisosaccionporrol : "Seguridad/consultar-permisos-accion-por-rol",
 registrarPermisosRolesAcciones: "Seguridad/asignar-permisos-a-rol",
 //Asignación Permisos y Acciones a Rol
 obtenerMenuPorRol:"Seguridad/consultar-menu-por-rol",


//Inicio Usuario
//  crearUsuario: 'User/crearusuario',
 obtenerListadoUsuarios: "User/listarusuarios"
 ,obtenerUsuarioPorId: "User/obtenerusuarioporid"
 ,actualizarUsuarioPorId: "User/actualizarusuario"
 ,eliminarUsuarioPorId:"User/eliminarusuarioporid"


//Inicio Productos

,obtenerListadoProductos: "productos/listarproductos"
,obtenerProductoPorId: "productos/obtenerproductoporid"
,registrarProductos: "productos/registrarproducto"
,actualizarProducto: "productos/actualizarproducto",
eliminarProductorPorId:"productos/eliminarproductosporid"

//Inicio Modulos
,registrarModulo: "modulos/crearmodulo",
obtenerModuloPorId: "modulos/obtenermoduloporid",
obtenerListadoModulos: "modulos/listarmodulos",
actualizarModulo: "modulos/actualizarmodulo",
eliminarModulo: "modulos/eliminarmodulo"

//Inicio SubModulos
,registrarSubModulo: "submodulos/crearsubmodulo",
obtenerSubModuloPorId: "submodulos/obtenersubmoduloporid",
obtenerListadoSubModulos: "submodulos/listarsubmodulos",
actualizarSubModulo: "submodulos/actualizarsubmodulo",
eliminarSubModulo: "submodulos/eliminarsubmodulo"


};


