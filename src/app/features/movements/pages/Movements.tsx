import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { NewMovementModal } from "../components/NewMovementModal";
import { useGetMovements } from "../hooks/useGetMovements";
import { REASONS_IN, REASONS_OUT, type Movement } from "../types";

const getMovementReasonLabel = (type: string, reason: string) => {
  const reasons = type === "IN" ? REASONS_IN : REASONS_OUT;
  const reasonObj = reasons.find((r) => r.id === reason);
  return reasonObj ? reasonObj.label : reason;
};

export const Movements = () => {
  const { data: movements, isLoading } = useGetMovements();

  return (
    <main className="flex flex-col gap-4">
      <article className="flex justify-between items-center">
        <h1 className="text-xl font-semibold min-w-fit">
          Lista de movimientos
        </h1>
        <article className="flex w-full justify-end">
          {/* <Input
            placeholder="Buscar movimientos..."
            aria-label="Buscador"
            className="w-full max-w-xs"
          /> */}
          <NewMovementModal />
        </article>
      </article>
      <Table
        aria-label="Tabla de movimientos"
        // selectionMode={isLoading ? "none" : "single"}
      >
        <TableHeader>
          <TableColumn>TIPO</TableColumn>
          <TableColumn>PRODUCTO</TableColumn>
          <TableColumn>CANTIDAD</TableColumn>
          <TableColumn>MOTIVO</TableColumn>
          <TableColumn>FECHA</TableColumn>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <span className="animate-pulse">Cargando movimientos...</span>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : movements && movements.length > 0 ? (
          <TableBody>
            {movements?.map((movement: Movement) => (
              <TableRow key={movement.id}>
                <TableCell
                  className={`${
                    movement.type === "IN" ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {movement.type === "IN" ? "Entrada" : "Salida"}
                </TableCell>
                <TableCell>{movement.product.name}</TableCell>
                <TableCell>{movement.quantity}</TableCell>
                <TableCell>{getMovementReasonLabel(movement.type, movement.reason)}</TableCell>
                <TableCell>
                  {new Date(movement.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent="No hay movimientos registrados.">
            {[]}
          </TableBody>
        )}
      </Table>
    </main>
  );
};
