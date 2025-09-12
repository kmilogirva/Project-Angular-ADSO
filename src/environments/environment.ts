export const environment = {
  production: false,

  // 🔗 Conexión API

  apiUrl: "https://localhost:44372/api/", // backend pruebas
  //apiUrl: "https://jkccanada.azurewebsites.net/", // backend producción
  

  // ==========================
  // 🔐 Seguridad
  // ==========================
  loginUsuario: 'Seguridad/InicioSesion',
  crearRol: 'Seguridad/crearrol',
  obtenerlistadoRoles: 'Seguridad/obtenerlistadoroles',
  obtenerComboRoles: 'Seguridad/combo-roles',
  consultarpermisosaccionporrol: 'Seguridad/consultar-permisos-accion-por-rol',
  registrarPermisosRolesAcciones: 'Seguridad/asignar-permisos-a-rol',
  obtenerMenuPorRol: 'Seguridad/consultar-menu-por-rol',

  // ==========================
  // 👤 Usuarios
  // ==========================
  obtenerListadoUsuarios: 'User/listarusuarios',
  obtenerUsuariosResponse: 'User/consultarusuarios',
  obtenerUsuarioPorId: 'User/obtenerusuarioporid',
  obtenerUsuarioPorIdTercero: 'User/consultarusuariosporidtercero',
  actualizarUsuarioPorId: 'User/actualizarusuario',
  eliminarUsuarioPorId: 'User/eliminarusuarioporid',
  crearUsuario: 'User/crearusuario',

  // ==========================
  // 🧾 Terceros
  // ==========================
  obtenerListadoTerceros: 'Terceros/listarterceros',
  obtenerTerceroPorId: 'Terceros/obtenerterceroporid',
  actualizarTerceroPorId: 'Terceros/actualizartercero',
  eliminarTerceroPorId: 'Terceros/eliminarterceroporid',
  crearTercero: 'Terceros/creartercero',

  // ==========================
  // 📋 Generales - Combos
  // ==========================
  obtenerComboTiposDocumento: 'generales/combo-tipos-documento',
  obtenerComboTiposTercero: 'generales/combo-tipos-terceros',
  obtenerComboTiposPersona: 'generales/combo-tipos-persona',
  obtenerComboPaises: 'generales/combo-paises',
  obtenerComboDepartamentos: 'generales/combo-departamentos',
  obtenerComboCiudades: 'generales/combo-ciudades',

  // ==========================
  // 📦 Productos
  // ==========================
  obtenerListadoProductos: 'productos/listarproductos',
  obtenerProductoPorId: 'productos/obtenerproductoporid',
  registrarProductos: 'productos/registrarproducto',
  actualizarProducto: 'productos/actualizarproducto',
  eliminarProductorPorId: 'productos/eliminarproductosporid',

  // ==========================
  // 📂 Módulos
  // ==========================
  registrarModulo: 'modulos/crearmodulo',
  obtenerModuloPorId: 'modulos/obtenermoduloporid',
  obtenerListadoModulos: 'modulos/listarmodulos',
  actualizarModulo: 'modulos/actualizarmodulo',
  eliminarModulo: 'modulos/eliminarmodulo',

  // ==========================
  // 📂 SubMódulos
  // ==========================
  registrarSubModulo: 'submodulos/crearsubmodulo',
  obtenerSubModuloPorId: 'submodulos/obtenersubmoduloporid',
  obtenerListadoSubModulos: 'submodulos/listarsubmodulos',
  actualizarSubModulo: 'submodulos/actualizarsubmodulo',
  eliminarSubModulo: 'submodulos/eliminarsubmodulo',

  // ==========================
  // 🗂 Categorías
  // ==========================
  crearCategorias: 'Categorias/registrarcategoria',
  actualizarCategorias: 'Categorias/actualizarcategoria',
  listarCategorias: 'categorias/listarcategorias',
  eliminarCategorias: 'Categorias/eliminarcategoriasporids',
  obtenerCategoriaPorId: 'Categorias/obtenercategoriaporid',

  // 🔑 Rutas de recuperación de contraseña
  solicitarRecuperacion: 'Recuperacion/solicitar-recuperacion',
  validarToken: 'Recuperacion/validar-token',
  restablecerContrasena: 'Recuperacion/restablecer-contrasena',
  
  // ==========================
  // (Entradas y Salidas)
  // ==========================

  obtenerListadoMovimientos: "movimientos/listarmovimientos",
  obtenerMovimientoPorId: "movimientos/obtenermovimientoporid",
  registrarMovimiento: "movimientos/crearmovimiento",
  actualizarMovimiento: "movimientos/actualizarmovimiento",
  eliminarMovimiento: "movimientos/eliminarmovimientoporid"

};
