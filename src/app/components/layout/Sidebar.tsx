import { useThemeStore } from "@/app/stores/theme.store";
import {
  Home,
  FileBox,
  ArrowUpDown,
  Users2,
  BarChart3,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router";

export const Sidebar = () => {
  const { theme } = useThemeStore();
  return (
    <aside className="flex flex-col w-96 border-r border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center h-16 p-4 border-b border-neutral-200 dark:border-neutral-800">
        <img
          src={theme === "dark" ? "/sitcols-light-ims-logo.svg" : "/sitcols-dark-ims-logo.svg"}
          alt="Sitcols IMS Logo"
          className="w-32"
        />
      </div>
      <nav className="space-y-2 p-4">
        {modules.map((module) => (
          <div key={module.name}>
            <h3 className="text-xs font-medium uppercase mb-1 text-neutral-500 dark:text-neutral-400">
              {module.name}
            </h3>
            <ul className="flex flex-col gap-1">
              {module.routes.map((route) => (
                <li key={route.name}>
                  <Link
                    to={`/${route.path}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {route.icon}
                    <span className="text-sm">{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export const modules = [
  {
    name: "General",
    routes: [{ name: "Inicio", path: "", icon: <Home className="size-5" /> }],
  },
  {
    name: "Inventario",
    routes: [
      {
        name: "Productos",
        path: "products",
        icon: <FileBox className="size-5" />,
        children: [
          {
            name: "Nuevo producto",
            path: "new",
          },
          {
            name: "Editar producto",
            path: "edit",
          },
        ],
      },
      {
        name: "Movimientos",
        path: "movements",
        icon: <ArrowUpDown className="size-5" />,
      }
    ],
  },
  {
    name: "Ventas",
    routes: [
      {
        name: "Ordenes",
        path: "orders",
        icon: <ShoppingBag className="size-5" />,
      },
      {
        name: "Clientes",
        path: "clients",
        icon: <Users2 className="size-5" />,
      },
    ],
  },
  {
    name: "Reportes",
    routes: [
      {
        name: "Reportes generales",
        path: "reports",
        icon: <BarChart3 className="size-5" />,
      },
    ],
  },
  {
    name: "Configuración",
    routes: [
      {
        name: "Usuarios y roles",
        path: "users",
        icon: <Settings className="size-5" />,
      },
    ],
  },
];
