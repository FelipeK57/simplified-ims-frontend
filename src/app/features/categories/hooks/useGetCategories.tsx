import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categories.services";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
