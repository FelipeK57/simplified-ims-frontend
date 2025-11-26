import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useGetCategories } from "../hooks/useGetCategories";
import type { Category } from "../types";
import { NewCategoryModal } from "../components/NewCategoryModal";

export const Categories = () => {
  const { data: categories, isLoading } = useGetCategories();
  return (
    <main className="flex flex-col gap-4">
      <article className="flex justify-between items-center">
        <h1 className="text-xl font-semibold min-w-fit">Lista de categorías</h1>
        <article className="flex w-full justify-end">
          {/* <Input
                  placeholder="Buscar categorías..."
                  aria-label="Buscador"
                  className="w-full max-w-xs"
                /> */}
          <NewCategoryModal />
        </article>
      </article>
      <Table
        aria-label="Tabla de categorías"
        // selectionMode={isLoading ? "none" : "single"}
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>DESCRIPCIÓN</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                <span className="animate-pulse">Cargando categorías...</span>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : categories && categories.length > 0 ? (
          <TableBody>
            {categories?.map((category: Category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent="No hay categorías registradas.">
            {[]}
          </TableBody>
        )}
      </Table>
    </main>
  );
};
