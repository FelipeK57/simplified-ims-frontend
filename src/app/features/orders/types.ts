import type { Product } from "../products/types";

export interface Order {
  id?: string;
  code: string;
  customer: string;
  status: "PENDING" | "PAID" | "SHIPPED" | "CANCELLED";
  paymentMethod: "CASH" | "CARD";
  total: number;
  source: "POS" | "ONLINE";
  storeId: string;
  createdAt: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id?: string;
  quantity: number;
  price: number;
  orderId: string;
  productId: string;
  product: Product;
}

export const STATUS = [
  { label: "Pendiente", value: "PENDING" },
  { label: "Pagado", value: "PAID" },
  { label: "Enviado", value: "SHIPPED" },
  { label: "Cancelado", value: "CANCELLED" },
];

export const PAYMENT_METHODS = [
  { label: "Efectivo", value: "CASH" },
  { label: "Tarjeta", value: "CARD" },
];
