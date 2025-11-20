import useAuthStore from "@/app/stores/auth.store";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="w-full h-16 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center px-4">
      <article className="flex gap-4 items-center">
        <Dropdown>
          <DropdownTrigger>
            <User
              avatarProps={{
                showFallback: true,
                name: user?.name || "Usuario",
              }}
              className="cursor-pointer"
              name={user?.name || "Usuario"}
              description={user?.email || "usuario@gmail.com"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
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
      <span>Sistema de gestión de inventario</span>
    </nav>
  );
};
