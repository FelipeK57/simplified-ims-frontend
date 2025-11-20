import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../services/auth.services";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.error("Error during registration:", error.message);
    },
  });
};
