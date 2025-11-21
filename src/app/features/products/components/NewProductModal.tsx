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
  Select,
  SelectItem,
} from "@heroui/react";
import { useCreateProduct } from "../hooks/useCreateProduct";

export const NewProductModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const createProductMutation = useCreateProduct();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    createProductMutation.mutate(data, {
      onSuccess: () => {
        addToast({
          title: "Producto creado exitosamente",
          color: "success",
          timeout: 2000,
        });
        onOpenChange();
      },
    });
  };
  return (
    <>
      <Button color="primary" className="ml-4" onPress={onOpen}>
        Agregar producto
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <Form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar producto
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-4">
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
                  <Input
                    name="price"
                    label="Precio"
                    labelPlacement="outside"
                    type="number"
                    min={1}
                    isRequired
                    placeholder="Precio del producto"
                  />
                  <Input
                    name="cost"
                    label="Costo"
                    labelPlacement="outside"
                    type="number"
                    min={0}
                    placeholder="Costo del producto"
                  />
                  <Input
                    name="stock"
                    label="Stock"
                    labelPlacement="outside"
                    type="number"
                    min={0}
                    placeholder="Cantidad en stock"
                  />
                  <Select
                    label="Categoría"
                    labelPlacement="outside"
                    placeholder="Selecciona una categoría"
                    name="category"
                    isRequired
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
