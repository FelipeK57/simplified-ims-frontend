import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orders.services";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
};
