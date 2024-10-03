import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./screens/About";
import ComponentError from "./screens/ComponentError";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Followers from "./screens/users/Followers";
import User from "./screens/users/User";
import UserList from "./screens/users/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ComponentError />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "userlist/:userId",
        element: <User />,
        children: [
          {
            path: "followers",
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);
export default router;
