import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  addToast,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { REASONS_IN, REASONS_OUT } from "../types";
import { useDebouncedValue } from "@/app/hooks/useDebounceValue";
import type { Product } from "../../products/types";
import { getProductByCode } from "../../products/services/product.services";
import { PackageX, Search } from "lucide-react";
import { useCreateMovement } from "../hooks/useCreateMovement";

export const NewMovementModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const createMovementMutation = useCreateMovement();

  const [type, setType] = useState<string>("IN");

  const [code, setCode] = useState<string>("");
  const debouncedCode = useDebouncedValue(code, 500);

  const [findedProduct, setFindedProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      if (debouncedCode.trim() === "") {
        setFindedProduct(null);
        return;
      }
      try {
        const result = await getProductByCode(debouncedCode);
        setFindedProduct(result.data);
      } catch (error) {
        setFindedProduct(null);
      }
    };

    getProduct();
  }, [debouncedCode]);

  const handleSelectProduct = (product: Product) => {
    setFindedProduct(null);
    setSelectedProduct(product);
    setCode("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const data = {
      ...formData,
      productId: selectedProduct?.id,
    };
    createMovementMutation.mutate(data, {
      onSuccess: () => {
        addToast({
          title: "Movimiento creado exitosamente",
          color: "success",
          timeout: 2000,
        });
        setSelectedProduct(null);
        setType("IN");
        setCode("");
        onOpenChange();
      },
    });
  };

  return (
    <>
      <Button color="primary" className="ml-4" onPress={onOpen}>
        Agregar Movimiento
      </Button>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <Form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Agregar movimiento
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-4">
                  <Select
                    defaultSelectedKeys={["IN"]}
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    name="type"
                    label="Tipo de movimiento"
                    labelPlacement="outside"
                    isRequired
                    disallowEmptySelection
                    aria-label="Tipo de movimiento"
                  >
                    <SelectItem key="IN">Entrada</SelectItem>
                    <SelectItem key="OUT">Salida</SelectItem>
                  </Select>
                  <Select
                    name="reason"
                    label="Motivo"
                    labelPlacement="outside"
                    placeholder="Selecciona el motivo"
                  >
                    {type === "IN"
                      ? REASONS_IN.map((reason) => (
                          <SelectItem key={reason.id}>
                            {reason.label}
                          </SelectItem>
                        ))
                      : REASONS_OUT.map((reason) => (
                          <SelectItem key={reason.id}>
                            {reason.label}
                          </SelectItem>
                        ))}
                  </Select>
                  <Input
                    startContent={
                      <Search className="text-default-400 size-5" />
                    }
                    isDisabled={!!selectedProduct}
                    type="search"
                    name="productCode"
                    label="Código de producto"
                    labelPlacement="outside"
                    placeholder="Busca por código de producto"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <Input
                    name="quantity"
                    label="Cantidad"
                    labelPlacement="outside"
                    placeholder="Ingresa la cantidad"
                    type="number"
                    min={1}
                    max={type === "OUT" ? selectedProduct?.stock : undefined}
                    isRequired
                  />
                  {findedProduct ? (
                    <Card
                      className="col-span-2 p-2"
                      classNames={{
                        base: "shadow-none border border-default-200",
                      }}
                    >
                      <CardHeader className="font-semibold text-lg">
                        {findedProduct.name} - {findedProduct.code}
                      </CardHeader>
                      <CardBody className="text-sm">
                        <p>Descripción: {findedProduct.description}</p>
                        <p>
                          Precio:
                          {findedProduct.price.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                          })}
                        </p>
                        <p>Stock disponible: {findedProduct.stock}</p>
                      </CardBody>
                      <CardFooter>
                        <Button
                          variant="faded"
                          onPress={() => handleSelectProduct(findedProduct)}
                          color="primary"
                        >
                          Seleccionar producto
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    debouncedCode.trim() !== "" &&
                    !selectedProduct && (
                      <div className="grid place-content-center col-span-2 mt-4">
                        <PackageX className="mb-2 text-default-500 size-14 stroke-1 mx-auto" />
                        <p className="text-xs text-center text-default-500 max-w-64">
                          No hemos encontrado ningún producto con ese código.
                        </p>
                      </div>
                    )
                  )}
                  {selectedProduct && (
                    <Card
                      className="col-span-2 p-2"
                      classNames={{
                        base: "shadow-none border border-default-200",
                      }}
                    >
                      <CardHeader className="font-semibold text-lg">
                        Producto seleccionado: {selectedProduct.name} -{" "}
                        {selectedProduct.code}
                      </CardHeader>
                      <CardBody className="text-sm">
                        <p>Descripción: {selectedProduct.description}</p>
                        <p>
                          Precio:
                          {selectedProduct.price.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                          })}
                        </p>
                        <p>Stock disponible: {selectedProduct.stock}</p>
                      </CardBody>
                      <CardFooter>
                        <Button
                          variant="faded"
                          onPress={() => setSelectedProduct(null)}
                          color="danger"
                        >
                          Quitar producto
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
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
