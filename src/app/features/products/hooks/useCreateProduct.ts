import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/product.services";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error.message);
    }
  });
};