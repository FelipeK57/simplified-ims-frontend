import type { Product } from "../products/types";

export interface Movement {
  id: string;
  type: "IN" | "OUT";
  quantity: number;
  reason: string;
  productId: string;
  product: Product;
  storeId: string;
  createdAt: string;
}

export const REASONS_IN = [
  { id: "RESTOCK", label: "Reabastecimiento" },
  { id: "RETURN", label: "Devolución de Cliente" },
  { id: "TRANSFER_IN", label: "Transferencia desde otra tienda" },
  { id: "ADJUSTMENT_IN", label: "Ajuste Positivo" },
  { id: "CORRECTION_IN", label: "Corrección de Inventario" },
  { id: "OTHER_IN", label: "Otro" },
];

export const REASONS_OUT = [
  { id: "DAMAGE", label: "Producto Dañado" },
  { id: "EXPIRED", label: "Producto Vencido" },
  { id: "THEFT", label: "Robo / Faltante" },
  { id: "TRANSFER_OUT", label: "Transferencia a otra tienda" },
  { id: "ADJUSTMENT_OUT", label: "Ajuste Negativo" },
  { id: "CORRECTION_OUT", label: "Corrección de Inventario" },
  { id: "OTHER_OUT", label: "Otro" },
];
