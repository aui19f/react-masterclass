import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { todoSelector, todoState } from "../../atom";
import Todo from "./Todo";

const Ul = styled.ul`
  padding: 40px;
`;

const Li = styled.li`
  display: flex;
  padding: 8px;
  background-color: rgba(222, 222, 222, 0.4);
  margin: 8px 0;
  p {
    flex: 1;
  }
  button {
    padding: 4px;
    margin-left: 8px;
    font-size: 80%;
    color: gray;
  }
`;

export default function List() {
  const todos = useRecoilValue(todoState);
  const selectorData = useRecoilValue(todoSelector);

  return (
    <Ul>
      {selectorData.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Ul>
  );
}
