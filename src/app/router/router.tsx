import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "../components/layout/MainLayout";
import { Products } from "../features/products/pages/Products";
import { Register } from "../features/auth/pages/Register";
import { Login } from "../features/auth/pages/Login";
import { NotFoundPage } from "../lib/NotFoundPage";
import { ProtectedRoute } from "../lib/ProtectedRoute";

// Routes

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>Dashboard</div>} />
          <Route path="products" element={<Products />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
