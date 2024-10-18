import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Loading from "./components/Loading.jsx";
import "./index.css";
import "@fontsource-variable/open-sans";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import router from "./routes/index.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Toaster position="top-center" />
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </AuthProvider>
);
