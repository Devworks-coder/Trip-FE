import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routers/app-router.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextWrapper from "./context/app-context-provider.tsx"; // Ensure it's imported after router
const queryClinet = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextWrapper>
      <QueryClientProvider client={queryClinet}>
        <RouterProvider router={appRouter} />

        <Toaster richColors position="top-center" closeButton />
      </QueryClientProvider>
    </AuthContextWrapper>
  </StrictMode>
);
