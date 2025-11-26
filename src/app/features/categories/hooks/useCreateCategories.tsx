import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../services/categories.services";

export const useCreateCategories = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      console.error("Error creating category:", error.message);
    },
  });
};
