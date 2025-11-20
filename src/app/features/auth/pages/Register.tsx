import { addToast, Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../hooks/useRegister";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.password && (data.password as string).length < 8) {
      addToast({
        title: "La contraseña debe tener al menos 8 caracteres.",
        color: "warning",
        timeout: 3000,
      });
      return;
    }

    registerMutation.mutate(data, {
      onSuccess: () => {
        addToast({
          title: "Registro exitoso. Ahora puedes iniciar sesión.",
          color: "success",
          timeout: 3000,
        });
        navigate("/login");
      },
    });
  };

  return (
    <main className="flex flex-col h-svh w-full">
      <article className="w-full h-16 border-b border-neutral-200 flex justify-center items-center px-4">
        Sistema de gestión de inventario
      </article>
      <section className="flex flex-col gap-4 items-center justify-center flex-1">
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-sm w-full"
        >
          <h1 className="font-semibold text-2xl text-center w-full">
            Registrate
          </h1>
          <Input
            label="Nombre completo"
            labelPlacement="outside"
            placeholder="Ingresa tu nombre completo"
            type="text"
            name="name"
            isRequired
          />
          <Input
            label="Correo electrónico"
            labelPlacement="outside"
            placeholder="Ingresa tu correo electrónico"
            type="email"
            name="email"
            isRequired
          />
          <Input
            label="Contraseña"
            labelPlacement="outside"
            placeholder="Ingresa tu contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            description="La contraseña debe tener al menos 8 caracteres."
            isRequired
            endContent={
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="text-xs text-neutral-600 cursor-pointer"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            }
          />
          <Button type="submit" color="primary" className="w-full">
            Registrarse
          </Button>
        </Form>
        <p className="text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-primary font-medium">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
};
