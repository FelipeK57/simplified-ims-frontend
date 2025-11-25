import { api } from "@/app/lib/api-client";
import { setupAuthHeader } from "@/app/lib/setupAuthHeader";
import { addToast } from "@heroui/react";
import axios from "axios";

export const getOrders = async () => {
  setupAuthHeader();
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrder = async (orderData: any) => {
  setupAuthHeader();
  try {
    const response = await api.post("/orders/pos", orderData);
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
