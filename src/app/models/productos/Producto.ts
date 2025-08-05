export interface Producto {
  idProducto?: number | null;
  codEan?: string;
  nomProducto: string;
  idCategoria: number;
  ubicacionProducto: string;
  cantidad: number;
  observacion?: string;
  seleccionado?: boolean;
}