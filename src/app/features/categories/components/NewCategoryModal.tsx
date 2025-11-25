import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@heroui/react";

export const NewCategoryModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" className="ml-4" onPress={onOpen}>
        Agregar Categoría
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar categoría
              </ModalHeader>
              <ModalBody>
                <Input
                  name="name"
                  label="Nombre"
                  labelPlacement="outside"
                  placeholder="Ingresa el nombre de la categoría"
                  isRequired
                />
                <Textarea
                  name="description"
                  label="Descripción"
                  labelPlacement="outside"
                  placeholder="Ingresa la descripción de la categoría"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
