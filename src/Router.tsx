import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chart from "./components/coin/Chart";
import Price from "./components/coin/Price";
import About from "./screens/About";
import Coin from "./screens/coins/Coin";
import Coins from "./screens/coins/Conins";
import ComponentError from "./screens/ComponentError";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Main from "./screens/todo/Main";
import Followers from "./screens/users/Followers";
import Join from "./screens/users/Join";
import User from "./screens/users/User";
import UserList from "./screens/users/UserList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Coins />,
        errorElement: <ComponentError />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          { path: "chart", element: <Chart /> },
          { path: "price", element: <Price /> },
        ],
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "todolist",
        element: <Main />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
export default router;
