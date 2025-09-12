
export interface Movimiento { 
  idMovimiento?: number;
  idProducto: number;
  cantidad: number;
  tipoMovimiento: 'entrada' | 'salida';
  observacion?: string;
  fechaMovimiento?: Date;
  idUsuarioCreacion?: number;
  idUsuarioModificacion?: number;
}
