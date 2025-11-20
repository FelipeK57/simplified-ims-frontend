import { api } from "@/app/lib/api-client";
import { addToast } from "@heroui/react";
import axios from "axios";

export const register = async (data: any) => {
  try {
    const response = await api.post("/auth/register", data);
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

export const login = async (data: any) => {
  try {
    const response = await api.post("/auth/login", data);
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