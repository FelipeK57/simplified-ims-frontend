import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useGetOrders } from "../hooks/useGetOrders";
import { STATUS, type Order } from "../types";
import { Link } from "react-router";

export const Orders = () => {
  const { data: orders, isLoading } = useGetOrders();
  return (
    <main className="flex flex-col gap-4">
      <article className="flex justify-between items-center">
        <h1 className="text-xl font-semibold min-w-fit">Lista de órdenes</h1>
        <article className="flex w-full justify-end">
          <Button as={Link} to="/orders/create-pos" color="primary" className="ml-4">
            Crear Venta POS
          </Button>
        </article>
      </article>
      <Table
        aria-label="Tabla de órdenes"
        // selectionMode={isLoading ? "none" : "single"}
      >
        <TableHeader>
          <TableColumn>FUENTE</TableColumn>
          <TableColumn>CÓDIGO</TableColumn>
          <TableColumn>CLIENTE</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>FECHA</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                <span className="animate-pulse">Cargando ordenes...</span>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : orders && orders.length > 0 ? (
          <TableBody>
            {orders?.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.source === "POS" ? "POS" : "WEB"}
                </TableCell>
                <TableCell>{order.code}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.total.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</TableCell>
                <TableCell>{STATUS.find(status => status.value === order.status)?.label}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent="No hay órdenes registradas.">{[]}</TableBody>
        )}
      </Table>
    </main>
  );
};
