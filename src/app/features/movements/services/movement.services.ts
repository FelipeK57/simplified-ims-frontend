import { api } from "@/app/lib/api-client";
import { setupAuthHeader } from "@/app/lib/setupAuthHeader";

export const createMovement = async (data: any) => {
  setupAuthHeader();
  try {
    const response = await api.post("/movements", data);
    return response.data;
  } catch (error) {
    console.error("Error creating movement:", error);
    throw error;
  }
};

export const getMovements = async () => {
  setupAuthHeader();
  try {
    const response = await api.get("/movements");
    return response.data;
  } catch (error) {
    console.error("Error fetching movements:", error);
    throw error;
  }
};
