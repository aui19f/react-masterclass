import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import router from "./Router";
import { lightTheme, darkTheme } from "./theme";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// const queryClient = new QueryClient();
// root.render(
//   <React.StrictMode>
//     <RecoilRoot>
//       <QueryClientProvider client={queryClient}>
//         <RouterProvider router={router} />
//       </QueryClientProvider>
//     </RecoilRoot>
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </RecoilRoot>
);
