import { Producto } from "../productos/Producto";

export interface ProductosResponse {
  mensaje:   string;
  producto: Producto;
}

export interface ListadoProductosResponse {
  mensaje:   string;
  productos: Producto[];   // ← array
}
