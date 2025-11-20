import { api } from "@/app/lib/api-client";
import { addToast } from "@heroui/react";
import axios from "axios";

export const getProducts = async (userId: number) => {
  try {
    const response = await api.get(`/products?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (productData: any) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        addToast({
          title: `Error: ${error.response.data.message}`,
          color: "danger",
          timeout: 3000,
        });
      }
    }
    throw error;
  }
};

export const updateProduct = async (productId: number, productData: any) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: number) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
