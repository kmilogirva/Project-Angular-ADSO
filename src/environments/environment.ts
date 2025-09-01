export const environment = {
  production: false,

  // 🔗 Conexión API
  apiUrl: "https://localhost:44374/api/", // backend pruebas

  // ==========================
  // 🔐 Seguridad
  // ==========================
  loginUsuario: "Seguridad/InicioSesion",
  crearRol: "Seguridad/crearrol",
  obtenerlistadoRoles: "Seguridad/obtenerlistadoroles",
  obtenerComboRoles: "Seguridad/combo-roles",
  consultarpermisosaccionporrol: "Seguridad/consultar-permisos-accion-por-rol",
  registrarPermisosRolesAcciones: "Seguridad/asignar-permisos-a-rol",
  obtenerMenuPorRol: "Seguridad/consultar-menu-por-rol",

  // ==========================
  // 👤 Usuarios
  // ==========================
  obtenerListadoUsuarios: "User/listarusuarios",
  obtenerUsuarioPorId: "User/obtenerusuarioporid",
  actualizarUsuarioPorId: "User/actualizarusuario",
  eliminarUsuarioPorId: "User/eliminarusuarioporid",
  crearUsuario: "crearusuario",

  // ==========================
  // 🧾 Terceros
  // ==========================
  obtenerListadoTerceros: "Terceros/listarterceros",
  obtenerTerceroPorId: "Terceros/obtenerterceroPorid",
  actualizarTerceroPorId: "Terceros/actualizartercero",
  eliminarTerceroPorId: "Terceros/eliminarterceroporid",
  crearTercero: "Terceros/creartercero",

  // 📋 Generales - Combos
  obtenerComboTiposDocumento: "generales/combo-tipos-documento",
  obtenerComboTiposTercero: "generales/combo-tipos-terceros",
  obtenerComboTiposPersona: "generales/combo-tipos-persona",
  obtenerComboPaises: "generales/combo-paises",
  obtenerComboDepartamentos: "generales/combo-departamentos",
  obtenerComboCiudades: "generales/combo-ciudades",

  // ==========================
  // 📦 Productos
  // ==========================
  obtenerListadoProductos: "Productos/listarproductos",
  obtenerProductoPorId: "Productos/obtenerproductoporid",
  registrarProductos: "Productos/registrarproducto",
  actualizarProducto: "Productos/actualizarproducto",
  eliminarProductorPorId: "Productos/eliminarproductosporid",

  // ==========================
  // 📂 Módulos
  // ==========================
  registrarModulo: "Modulos/crearmodulo",
  obtenerModuloPorId: "Modulos/obtenermoduloporid",
  obtenerListadoModulos: "Modulos/listarmodulos",
  actualizarModulo: "Modulos/actualizarmodulo",
  eliminarModulo: "Modulos/eliminarmodulo",

  // ==========================
  // 📂 SubMódulos
  // ==========================
  registrarSubModulo: "Submodulos/crearsubmodulo",
  obtenerSubModuloPorId: "Submodulos/obtenersubmoduloporid",
  obtenerListadoSubModulos: "Submodulos/listarsubmodulos",
  actualizarSubModulo: "Submodulos/actualizarsubmodulo",
  eliminarSubModulo: "Submodulos/eliminarsubmodulo",

  // ==========================
  // 🗂 Categorías
  // ==========================
  crearCategorias: "Categorias",
  actualizarCategorias: "Categorias",
  listarCategorias: "Categorias",
  eliminarCategorias: "Categorias",
  obtenerCategoriaPorId: "Categorias",
};