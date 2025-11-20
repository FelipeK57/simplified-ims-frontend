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
    <Modal scrollBehavior="inside" isOpen={isOpen} onOpenChange={setOpen}>
      <Form onSubmit={handleSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar datos del producto</ModalHeader>
              <ModalBody>
                <Input
                  defaultValue={product.name}
                  label="Nombre"
                  labelPlacement="outside"
                  isRequired
                  name="name"
                  placeholder="Ingrese el nombre del proveedor"
                />
                <Input
                  defaultValue={product.code}
                  label="Código"
                  labelPlacement="outside"
                  isRequired
                  name="code"
                  placeholder="Ingrese el código del producto"
                />
                <Textarea
                  defaultValue={product.description}
                  label="Descripción"
                  labelPlacement="outside"
                  isRequired
                  name="description"
                  placeholder="Ingrese la descripción del producto"
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
