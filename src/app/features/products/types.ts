import type { Category } from "../categories/types";

export interface Product {
  id?: number;
  name: string;
  code: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  category: Category;
  categoryId: number;
  storeId: number;
}
