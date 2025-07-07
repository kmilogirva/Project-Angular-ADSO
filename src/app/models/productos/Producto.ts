export interface Producto {
  idProducto?: number;
  codEan?: string;
  nomProducto: string;
  idCategoria: number;
  ubicacionProducto: string;
  cantidad: number;
  observacion?: string;
  seleccionado?: boolean;
}