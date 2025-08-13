export const environment = {

  production: false,

 //Inicio Conexión Api y Variables

 apiUrl: "https://localhost:44374/api/", // backend pruebas


//Inicio Seguridad
 loginUsuario: "Seguridad/InicioSesion",
 crearRol: "Seguridad/crearrol",
 obtenerlistadoRoles: "Seguridad/obtenerlistadoroles",
 obtenerComboRoles: "Seguridad/combo-roles",
 consultarpermisosaccionporrol : "Seguridad/consultar-permisos-accion-por-rol",
 registrarPermisosRolesAcciones: "Seguridad/asignar-permisos-a-rol",
 //Asignación Permisos y Acciones a Rol
 obtenerMenuPorRol:"Seguridad/consultar-menu-por-rol",


//Inicio Usuario
//  crearUsuario: 'User/crearusuario',
 obtenerListadoUsuarios: "User/listarusuarios",
 obtenerUsuarioPorId: "User/obtenerusuarioporid",
 actualizarUsuarioPorId: "User/actualizarusuario",
 eliminarUsuarioPorId:"User/eliminarusuarioporid",


//Inicio Productos

obtenerListadoProductos: "productos/listarproductos",
obtenerProductoPorId: "productos/obtenerproductoporid",
registrarProductos: "productos/registrarproducto",
actualizarProducto: "productos/actualizarproducto",
eliminarProductorPorId:"productos/eliminarproductosporid",

//Inicio Modulos
registrarModulo: "modulos/crearmodulo",
obtenerModuloPorId: "modulos/obtenermoduloporid",
obtenerListadoModulos: "modulos/listarmodulos",
actualizarModulo: "modulos/actualizarmodulo",
eliminarModulo: "modulos/eliminarmodulo"

//Inicio SubModulos
,registrarSubModulo: "submodulos/crearsubmodulo",
obtenerSubModuloPorId: "submodulos/obtenersubmoduloporid",
obtenerListadoSubModulos: "submodulos/listarsubmodulos",
actualizarSubModulo: "submodulos/actualizarsubmodulo",
eliminarSubModulo: "submodulos/eliminarsubmodulo",

// 👇 Endpoints correctos de Categorías
  crearCategorias: "Categorias/registrarcategoria",
  actualizarCategorias: "Categorias/actualizarcategoria",
  listarCategorias: "categorias/listarcategorias",
  eliminarCategorias: "Categorias/eliminarcategoriasporids",
  obtenerCategoriaPorId: "Categorias/obtenercategoriaporid"

};


