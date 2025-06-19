export interface Producto {
  idProducto?: number;
  nombreProducto: string;
  categoria: string;
  cantidad: number;
  ubicacion: string;
  observacion: string;
  seleccionado?: boolean;
}