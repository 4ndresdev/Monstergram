import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Generate from "../pages/Generate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/generate",
    element: (
      <PrivateRoute>
        <Generate />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
