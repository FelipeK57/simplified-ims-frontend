import { useQuery } from "@tanstack/react-query";
import { getMovements } from "../services/movement.services";

export const useGetMovements = () => {
  return useQuery({
    queryKey: ["movements"],
    queryFn: () => getMovements(),
  });
};
