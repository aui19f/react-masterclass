import { QueryClient } from "react-query";
import { Outlet } from "react-router";
import { createGlobalStyle } from "styled-components";
import { Reset } from "./styled/reset";

const GlobalStyle = createGlobalStyle`
body{
  // background-color: ${(props) => props.theme.bgColor};
  // color: ${(props) => props.theme.textColor}
}
`;

// queryClient 생성
const queryClient = new QueryClient();

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
