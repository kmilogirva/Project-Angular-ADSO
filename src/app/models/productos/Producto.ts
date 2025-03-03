export interface Producto {
  codReferencia: string;
  nombreProducto: string;
  categoria: string;
  cantidad: number;
  precio: number;
  seleccionado?: boolean;
}