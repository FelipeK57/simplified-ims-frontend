import { api } from "./api-client";

export const setupAuthHeader = () => {
  const storage = localStorage.getItem("auth-storage");
  if (storage) {
    const parsed = JSON.parse(storage);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${parsed.state.token}`;
  }
};
