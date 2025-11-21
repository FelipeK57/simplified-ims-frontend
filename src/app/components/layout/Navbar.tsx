import useAuthStore from "@/app/stores/auth.store";
import { useThemeStore } from "@/app/stores/theme.store";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const { payload, clearAuth } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="w-full h-16 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center px-4">
      <span>
        Panel de {payload?.storeName || "Nombre de la tienda"}
      </span>
      <article className="flex gap-4 items-center">
        <Dropdown>
          <DropdownTrigger>
            <User
              avatarProps={{
                showFallback: true,
                name: payload?.name || "Usuario",
              }}
              className="cursor-pointer"
              name={payload?.name || "Usuario"}
              description={
                payload?.role === "owner" ? "Propietario" : "Empleado"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="toggle-theme"
              variant="light"
              onPress={toggleTheme}
            >
              Modo {theme === "light" ? "oscuro" : "claro"}
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              variant="flat"
              onPress={handleLogout}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </article>
    </nav>
  );
};
