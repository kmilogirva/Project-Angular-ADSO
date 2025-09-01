export interface Categoria {
  idCategoria?: number;
  nomCategoria: string;
  descripcion: string;
  estado: boolean;
  idUsuarioCreacion?: number;
  idUsuarioModificacion?: number;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}
