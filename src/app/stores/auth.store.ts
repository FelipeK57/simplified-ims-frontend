import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface Payload {
  name: string;
  role: string;
  storeName: string;
  email: string;
}

interface AuthState {
  token: string | null;
  payload: Payload | null;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      payload: null,
      setToken: (token: string) => {
        const decoded: Payload = jwtDecode(token);
        set({
          token,
          payload: {
            name: decoded.name,
            role: decoded.role,
            storeName: decoded.storeName,
            email: decoded.email,
          },
        });
      },
      clearAuth: () => set({ token: null, payload: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
