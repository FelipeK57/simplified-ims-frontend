import { useMutation, QueryClient } from "@tanstack/react-query";
import { login } from "../services/auth.services"

export const useLogin = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.error("Error during login:", error.message);
    },
  });
}