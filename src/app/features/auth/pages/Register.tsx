import { addToast, Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../hooks/useRegister";
import { useThemeStore } from "@/app/stores/theme.store";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const { theme } = useThemeStore();

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
      <article className="w-full h-16 border-b border-neutral-200 dark:border-neutral-800 flex justify-start items-center px-4">
        <img
          src={theme === "dark" ? "/sitcols-light-ims-logo.svg" : "/sitcols-dark-ims-logo.svg"}
          alt="Sitcols IMS Logo"
          className="w-32"
        />
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
            label="Nombre del administrador"
            labelPlacement="outside"
            placeholder="Ingresa tu nombre"
            type="text"
            name="username"
            isRequired
          />
          <Input
            label="Nombre de la tienda"
            labelPlacement="outside"
            placeholder="Ingresa el nombre de tu tienda"
            type="text"
            name="storeName"
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
                className="text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer"
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
