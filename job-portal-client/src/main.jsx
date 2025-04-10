import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
