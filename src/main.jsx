import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import Loading from "./components/Loading.jsx";
import "./index.css";
import "@fontsource-variable/open-sans";

const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./pages/Login.jsx")), 3000);
  });
});

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<Loading />}>
    <Login />
  </Suspense>
);
