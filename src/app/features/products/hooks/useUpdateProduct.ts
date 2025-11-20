import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../services/product.services";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      productData,
    }: {
      productId: number;
      productData: any;
    }) => updateProduct(productId, productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error updating product:", error.message);
    },
  });
};
