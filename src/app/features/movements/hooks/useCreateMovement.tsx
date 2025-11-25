import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovement } from "../services/movement.services";

export const useCreateMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movements"] });
    },
    onError: (error: any) => {
      console.error("Error creating movement:", error.message);
    },
  });
};
