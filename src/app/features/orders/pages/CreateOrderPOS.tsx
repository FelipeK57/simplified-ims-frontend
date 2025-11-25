import { useDebouncedValue } from "@/app/hooks/useDebounceValue";
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  Banknote,
  ChevronLeft,
  CreditCard,
  Minus,
  PackageOpen,
  Plus,
  Search,
  //   User,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getProductByCode } from "../../products/services/product.services";
import type { Product } from "../../products/types";
import type { OrderItem } from "../types";
import { Link } from "react-router";
import { useCreateOrder } from "../hooks/useCreateOrder";

export const CreateOrderPOS = () => {
  const [code, setCode] = useState("");
  //   const [findedProduct, setFindedProduct] = useState<Product | null>(null);
  const createOrderMutation = useCreateOrder();

  const debouncedCode = useDebouncedValue(code, 500);

  const [orderItems, setOrderItems] = useState<Partial<OrderItem>[]>([]);

  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);

  const [methodPayment, setMethodPayment] = useState<"CASH" | "CARD">("CASH");

  useEffect(() => {
    const getProduct = async () => {
      if (debouncedCode.trim() === "") {
        // setFindedProduct(null);
        return;
      }
      try {
        const result = await getProductByCode(debouncedCode);
        handleAddProduct(result.data);
        // setFindedProduct(result.data);
      } catch (error) {
        // setFindedProduct(null);
        addToast({
          title: "Producto no encontrado.",
          color: "danger",
          timeout: 3000,
        });
      }
    };

    getProduct();
  }, [debouncedCode]);

  const handleAddProduct = (product: Product) => {
    const existingItem = orderItems.find(
      (item) => item.product?.id === product.id
    );
    if (existingItem) {
      // If the product is already in the order items, show a toast notification
      addToast({
        title: "El producto ya está en la orden.",
        color: "warning",
        timeout: 3000,
      });
      return;
    } else {
      // If the product is not in the order, add it with quantity 1
      setOrderItems((prevItems) => [
        ...prevItems,
        {
          productId: String(product.id),
          product: product,
          quantity: 1,
          price: product.price,
        },
      ]);
      setSubtotal((prevSubtotal) => prevSubtotal + product.price);
      setTaxes((prevTaxes) => prevTaxes + product.price * 0.19);
    }
    // setFindedProduct(null);
    addToast({
      title: "Producto agregado a la orden.",
      color: "success",
      timeout: 3000,
    });
    setCode("");
  };

  const addOneMoreUnit = (productId: string, price: number) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      )
    );
    setSubtotal((prevSubtotal) => prevSubtotal + price);
    setTaxes((prevTaxes) => prevTaxes + price * 0.19);
  };

  const removeOneUnit = (productId: string, price: number) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: (item.quantity || 0) - 1 }
            : item
        )
        .filter((item) => item.quantity! > 0)
    );
    setSubtotal((prevSubtotal) => prevSubtotal - price);
    setTaxes((prevTaxes) => prevTaxes - price * 0.19);
  };

  const handleRemoveItem = (
    productId: string,
    price: number,
    quantity: number
  ) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
    setSubtotal((prevSubtotal) => prevSubtotal - price * quantity);
    setTaxes((prevTaxes) => prevTaxes - price * 0.19 * quantity);
  };

  const handleSubmit = () => {
    if (orderItems.length === 0) {
      addToast({
        title: "Agrega al menos un producto a la orden.",
        color: "warning",
        timeout: 3000,
      });
      return;
    }
    const data = {
      items: orderItems,
      paymentMethod: methodPayment,
      customer: null,
      total: subtotal + taxes,
    };
    createOrderMutation.mutate(data, {
      onSuccess: () => {
        addToast({
          title: "Orden creada exitosamente",
          color: "success",
          timeout: 2000,
        });
        // Reset state
        setOrderItems([]);
        setSubtotal(0);
        setTaxes(0);
        setMethodPayment("CASH");
      },
    });
  };

  return (
    <main className="flex flex-col gap-4">
      <article className="flex gap-2 items-center">
        <Button as={Link} to="/orders" variant="light" isIconOnly>
          <ChevronLeft className="size-5" />
        </Button>
        <h1 className="text-xl font-semibold">Crear Venta POS</h1>
      </article>
      <section className="grid grid-cols-3 gap-4 relative">
        <section className="flex flex-col gap-4 col-span-2">
          <Input
            startContent={<Search className="text-default-400 size-5" />}
            type="search"
            name="productCode"
            aria-label="Código de producto"
            placeholder="Busca por código de producto"
            className="max-w-1/2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {/* {findedProduct ? (
            <Card
              className="col-span-2"
              classNames={{
                base: "shadow-none border border-default-200",
              }}
            >
              <CardBody className="flex flex-row items-center justify-between">
                <p>
                  {findedProduct.name} -{" "}
                  {findedProduct.price.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </p>
                <Button
                  variant="faded"
                  onPress={() => handleSelectProduct(findedProduct)}
                  color="primary"
                >
                  Agregar
                </Button>
              </CardBody>
            </Card>
          ) : null} */}
          <article className="flex items-center justify-between">
            <h3>Productos agregados:</h3>
            {orderItems.length > 0 && (
              <Button
                variant="faded"
                color="danger"
                onPress={() => {
                  setOrderItems([]);
                  setSubtotal(0);
                  setTaxes(0);
                }}
              >
                Eliminar todo
              </Button>
            )}
          </article>
          {orderItems.length === 0 ? (
            <div className="grid place-content-center col-span-2 mt-4">
              <PackageOpen className="mb-2 text-default-500 size-14 stroke-1 mx-auto" />
              <p className="text-xs text-center text-default-500 max-w-64">
                No has agregado ningún producto a la orden.
              </p>
            </div>
          ) : (
            <Table aria-label="Detalles de la orden" removeWrapper>
              <TableHeader>
                <TableColumn>PRODUCTO</TableColumn>
                <TableColumn>PRECIO</TableColumn>
                <TableColumn>CANTIDAD</TableColumn>
                <TableColumn>TOTAL</TableColumn>
                <TableColumn>ACCIÓN</TableColumn>
              </TableHeader>
              <TableBody>
                {orderItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product?.name}</TableCell>
                    <TableCell>
                      {item.price?.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </TableCell>
                    <TableCell className="flex items-center gap-4">
                      <Button
                        onPress={() =>
                          removeOneUnit(String(item.productId), item.price!)
                        }
                        isIconOnly
                        variant="flat"
                        size="sm"
                        isDisabled={item.quantity! <= 1}
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="min-w-2">{item.quantity}</span>
                      <Button
                        onPress={() =>
                          addOneMoreUnit(String(item.productId), item.price!)
                        }
                        isIconOnly
                        variant="flat"
                        size="sm"
                        isDisabled={item.quantity! >= item.product?.stock!}
                      >
                        <Plus className="size-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {(item.price! * item.quantity!).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={() =>
                          handleRemoveItem(
                            String(item.productId),
                            item.price!,
                            item.quantity!
                          )
                        }
                      >
                        <X className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
        <section className="flex flex-col gap-4 sticky top-4 h-fit">
          <Card
            className="p-2"
            classNames={{
              base: "shadow-none border border-default-200",
            }}
          >
            <CardHeader className="text-lg font-bold">
              Detalles de la orden
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <article className="flex flex-col gap-2">
                <p className="font-semibold">Metodo de pago:</p>
                <article className="flex flex-col 2xl:flex-row 2xl:items-center gap-2">
                  <div
                    onClick={() => {
                      setMethodPayment("CASH");
                    }}
                    className={`flex items-center justify-center border border-default-200 rounded-xl p-2 w-full cursor-pointer transition-colors ${
                      methodPayment === "CASH"
                        ? "bg-primary/5 text-primary border-primary"
                        : "text-default-400 hover:text-default-600 hover:border-default-600"
                    }`}
                  >
                    <Banknote className="size-5 mr-2" />
                    <span className="text-sm">Efectivo</span>
                  </div>
                  <div
                    onClick={() => {
                      setMethodPayment("CARD");
                    }}
                    className={`flex items-center justify-center border border-default-200 rounded-xl p-2 w-full cursor-pointer transition-colors ${
                      methodPayment === "CARD"
                        ? "bg-primary/5 text-primary border-primary"
                        : "text-default-400 hover:text-default-600 hover:border-default-600"
                    }`}
                  >
                    <CreditCard className="size-5 mr-2" />
                    <span className="text-sm">Tarjeta</span>
                  </div>
                </article>
              </article>
              {/* <article className="flex flex-col gap-2">
                <p className="font-semibold">Cliente:</p>
                <article className="flex flex-col 2xl:flex-row 2xl:items-center gap-2">
                  <Input
                    startContent={<User className="text-default-400 size-5" />}
                    placeholder="ID de cliente registrado (opcional)"
                    aria-label="Identificación del cliente"
                  />
                  <span className="text-center">Ó</span>
                  <Button
                    variant="faded"
                    className="w-full 2xl:max-w-fit 2xl:w-full"
                  >
                    Agregar cliente
                  </Button>
                </article>
              </article> */}
              <article className="flex flex-col gap-2">
                <p className="font-semibold">Resumen de la venta:</p>
                <article className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>
                    {subtotal.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </span>
                </article>
                <article className="flex justify-between text-sm">
                  <span>Impuestos:</span>
                  <span>
                    {taxes.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </span>
                </article>
                <Divider />
                <article className="flex justify-between font-semibold text-sm">
                  <span>Total:</span>
                  <span>
                    {(subtotal + taxes).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </span>
                </article>
              </article>
            </CardBody>
            <CardFooter>
              <Button color="primary" fullWidth onPress={handleSubmit}>
                Finalizar Venta
              </Button>
            </CardFooter>
          </Card>
        </section>
      </section>
    </main>
  );
};
