import { addToast, Button, Form, Input } from "@heroui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "../hooks/useLogin";
import useAuthStore from "@/app/stores/auth.store";
import { useThemeStore } from "@/app/stores/theme.store";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const { setToken } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setToken(response.jwt);
        addToast({
          title: "Inicio de sesión exitoso.",
          color: "success",
          timeout: 3000,
        });
        navigate("/products");
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
            Ingresar al sistema
          </h1>
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
            Iniciar sesión
          </Button>
        </Form>
        <p className="text-sm">
          ¿Aún no tienes una cuenta?{" "}
          <Link to="/register" className="text-primary font-medium">
            Regístrate
          </Link>
        </p>
      </section>
    </main>
  );
};
