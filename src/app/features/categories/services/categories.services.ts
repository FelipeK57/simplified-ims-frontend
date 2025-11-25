import { api } from "@/app/lib/api-client";
import { setupAuthHeader } from "@/app/lib/setupAuthHeader";

export const getCategories = async () => {
  setupAuthHeader();
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (name: string) => {
  setupAuthHeader();
  try {
    const response = await api.post("/categories", { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};
