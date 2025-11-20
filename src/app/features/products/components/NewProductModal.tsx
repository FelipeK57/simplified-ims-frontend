import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Form,
  Textarea,
  addToast,
} from "@heroui/react";
import { useCreateProduct } from "../hooks/useCreateProduct";
import useAuthStore from "@/app/stores/auth.store";

export const NewProductModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuthStore();
  const createProductMutation = useCreateProduct();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    createProductMutation.mutate(
      { ...data, userId: user?.id as number },
      {
        onSuccess: () => {
          addToast({
            title: "Producto creado exitosamente",
            color: "success",
            timeout: 2000,
          });
          onOpenChange();
        },
      }
    );
  };
  return (
    <>
      <Button color="primary" className="ml-4" onPress={onOpen}>
        Agregar producto
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <Form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar producto
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="name"
                    label="Nombre"
                    labelPlacement="outside"
                    isRequired
                    placeholder="Nombre del producto"
                  />
                  <Input
                    name="code"
                    label="Código"
                    labelPlacement="outside"
                    isRequired
                    placeholder="Código del producto"
                  />
                  <Textarea
                    name="description"
                    label="Descripción"
                    labelPlacement="outside"
                    isRequired
                    placeholder="Descripción del producto"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
};
