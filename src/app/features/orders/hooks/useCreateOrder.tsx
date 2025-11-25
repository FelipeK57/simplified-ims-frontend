import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../services/orders.services";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      console.error("Error creating order:", error.message);
    },
  });
};
