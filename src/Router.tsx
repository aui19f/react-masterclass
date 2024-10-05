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
        element: <Coins />,
        errorElement: <ComponentError />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          { path: "chart", element: <Chart /> },
          { path: "price", element: <Price /> },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);
export default router;
