import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Netflix() {
  return (
    <>
      <Header />
      <hr />
      <Outlet />
    </>
  );
}
