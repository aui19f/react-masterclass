import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import CardDraggable from "./CardDraggable";

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoardProps {
  boardId: string;
  todos: string[];
}

export default function BoardDroppable({ boardId, todos }: IBoardProps) {
  return (
    <Board>
      <h1>??</h1>
      <Droppable droppableId={boardId}>
        {(arg1) => (
          <div ref={arg1.innerRef} {...arg1.droppableProps}>
            {todos.map((todo, index) => (
              <CardDraggable key={todo} {...{ index, todo }} />
            ))}
            {arg1.placeholder}
          </div>
        )}
      </Droppable>
    </Board>
  );
}
