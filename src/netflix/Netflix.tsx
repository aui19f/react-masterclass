import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Pages = styled.div`
  display: flex;
  flex-direction: column;
  > nav {
  }
  > div {
    flex: 1;
    /* margin-top: 68px; */
  }
`;
export default function Netflix() {
  return (
    <Pages>
      <Header />
      <div>
        <Outlet />
      </div>
    </Pages>
  );
}
