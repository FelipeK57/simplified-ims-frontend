import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  // Pagination,
} from "@heroui/react";
import { useGetProducts } from "../hooks/useGetProducts";
import type { Product } from "../types";
import { NewProductModal } from "../components/NewProductModal";
import { useEffect, useState } from "react";
import { EditProductModal } from "../components/EditProductModal";
export const Products = () => {
  const { data: products, isLoading } = useGetProducts();

  // Edit states
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpenEditModal = (product: Product) => {
    setEditModalOpen(true);
    setProductToEdit(product);
  };

  useEffect(() => {
    if (!editModalOpen) {
      setProductToEdit(null);
    }
  }, [editModalOpen]);

  return (
    <main className="flex flex-col gap-4">
      <article className="flex justify-between items-center">
        <h1 className="text-xl font-semibold min-w-fit">Lista de productos</h1>
        <article className="flex w-full justify-end">
          {/* <Input
            placeholder="Buscar productos..."
            aria-label="Buscador"
            className="w-full max-w-xs"
          /> */}
          <NewProductModal />
        </article>
      </article>
      <Table
        aria-label="Tabla de productos"
        selectionMode={isLoading ? "none" : "single"}
      >
        <TableHeader>
          <TableColumn>CÓDIGO</TableColumn>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>CATEGORÍA</TableColumn>
          <TableColumn>PRECIO</TableColumn>
          <TableColumn>STOCK</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <span className="animate-pulse">Cargando productos...</span>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : products && products.length > 0 ? (
          <TableBody>
            {products?.map((product: Product) => (
              <TableRow
                key={product.id}
                className="cursor-pointer"
                onClick={() => {
                  handleOpenEditModal(product);
                }}
              >
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</TableCell>
                <TableCell>{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent="No hay productos registrados.">
            {[]}
          </TableBody>
        )}
      </Table>
      {/* <Pagination
        isCompact
        showControls
        className="ml-auto"
        initialPage={1}
        total={10}
      /> */}
      <EditProductModal
        isOpen={editModalOpen}
        setOpen={setEditModalOpen}
        product={productToEdit!}
      />
    </main>
  );
};
