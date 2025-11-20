import { QueryProvider } from "./providers/query-provider";
import { RouterProvider } from "./router/router";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
// @ts-ignore
import '@fontsource-variable/inter';

export const App = () => {
  return (
    <QueryProvider>
      <HeroUIProvider>
        <ToastProvider placement="top-center" maxVisibleToasts={2} />
        <RouterProvider />
      </HeroUIProvider>
    </QueryProvider>
  );
};
