import { hasChanges } from "@/app/utils/hasChanges";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import type { Product } from "../types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Form,
  Textarea,
  addToast,
  Select,
  SelectItem,
} from "@heroui/react";

interface EditProductModalProps {
  product: Product;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const EditProductModal = ({
  product,
  isOpen,
  setOpen,
}: EditProductModalProps) => {
  if (!isOpen && !product) {
    return;
  }

  const updateProductMutation = useUpdateProduct();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (!hasChanges(product, data)) {
      addToast({
        title: "No se realizaron cambios",
        color: "warning",
        timeout: 2000,
      });
      return;
    }

    updateProductMutation.mutate(
      { productId: Number(product.id), productData: data },
      {
        onSuccess: () => {
          addToast({
            title: "Producto actualizado exitosamente",
            color: "success",
            timeout: 2000,
          });
          setOpen(false);
        },
      }
    );
  };

  return (
    <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={setOpen} size="2xl">
      <Form onSubmit={handleSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar datos del producto</ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-4">
                <Input
                  name="name"
                  label="Nombre"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Nombre del producto"
                  defaultValue={product.name}
                />
                <Input
                  name="code"
                  label="Código"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Código del producto"
                  defaultValue={product.code}
                />
                <Input
                  name="price"
                  label="Precio"
                  labelPlacement="outside"
                  type="number"
                  min={1}
                  isRequired
                  placeholder="Precio del producto"
                  defaultValue={product.price.toString()}
                />
                <Input
                  name="cost"
                  label="Costo"
                  labelPlacement="outside"
                  type="number"
                  min={0}
                  placeholder="Costo del producto"
                  defaultValue={product.cost.toString()}
                />
                <Input
                  isReadOnly
                  name="stock"
                  label="Stock"
                  labelPlacement="outside"
                  type="number"
                  min={0}
                  placeholder="Cantidad en stock"
                  defaultValue={product.stock.toString()}
                />
                <Select
                  label="Categoría"
                  labelPlacement="outside"
                  placeholder="Selecciona una categoría"
                  name="category"
                  isRequired
                  defaultSelectedKeys={[product.category]}
                >
                  <SelectItem key={"Electrónica"}>Electrónica</SelectItem>
                  <SelectItem key={"Ropa"}>Ropa</SelectItem>
                  <SelectItem key={"Libros"}>Libros</SelectItem>
                  <SelectItem key={"Muebles"}>Muebles</SelectItem>
                  <SelectItem key={"Juguetes"}>Juguetes</SelectItem>
                  <SelectItem key={"Belleza"}>Belleza</SelectItem>
                  <SelectItem key={"Deportes"}>Deportes</SelectItem>
                  <SelectItem key={"Automotriz"}>Automotriz</SelectItem>
                  <SelectItem key={"Otro"}>Otro</SelectItem>
                </Select>
                <Textarea
                  className="col-span-2"
                  name="description"
                  label="Descripción"
                  labelPlacement="outside"
                  placeholder="Descripción del producto"
                  defaultValue={product.description}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" type="submit">
                  Guardar cambios
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
};
