import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.services";

export const useGetProducts = (userId: number) => {
  return useQuery({
    queryKey: ["products", userId],
    queryFn: () => getProducts(userId),
  });
};
