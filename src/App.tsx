import { Outlet } from "react-router";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import router from "./Router";
import { Reset } from "./styled/reset";

const GlobalStyle = createGlobalStyle`
body{
  // background-color: ${(props) => props.theme.bgColor};
  // color: ${(props) => props.theme.textColor}
}
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Outlet />
    </>
  );
}
export default App;
