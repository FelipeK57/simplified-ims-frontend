import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import type { User } from "../features/users/types";

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token: string) => {
        const decoded: User = jwtDecode(token);
        set({ token, user: decoded });
      },
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
