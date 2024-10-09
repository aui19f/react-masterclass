import { QueryClient } from "react-query";
import { Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atom";
import { Reset } from "./styled/reset";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
body{
  // background-color: ${(props) => props.theme.bgColor};
  // color: ${(props) => props.theme.textColor}
}
`;

// queryClient 생성
const queryClient = new QueryClient();

function App() {
  //atom 값 가져오기
  const value = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={value ? darkTheme : lightTheme}>
        <Reset />
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
    </>
  );
}
export default App;
