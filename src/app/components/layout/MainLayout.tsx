import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const MainLayout = () => {
  return (
    <main className="h-svh flex">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Navbar />
        <section className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </section>
      </section>
    </main>
  );
};
