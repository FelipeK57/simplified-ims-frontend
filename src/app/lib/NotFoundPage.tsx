import { Button } from "@heroui/react";
import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl">Página no encontrada</p>
      <Button as={Link} to="/" className="mt-6">
        Volver al inicio
      </Button>
    </div>
  );
};
