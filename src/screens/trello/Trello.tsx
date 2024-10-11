import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoObj, trelloTodoState } from "../../atom";
import BoardDroppable from "./BoardDroppable";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function Trello() {
  const [trelloTodo, setTrelloTodo] = useRecoilState(trelloTodoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTrelloTodo((allBoards) => {
      const copyToDos: ITodoObj = {};

      Object.keys(allBoards).forEach((toDosKey) => {
        copyToDos[toDosKey] = [...allBoards[toDosKey]];
      });

      copyToDos[source.droppableId].splice(source.index, 1);
      copyToDos[destination.droppableId].splice(
        destination.index,
        0,
        draggableId
      );
      return copyToDos;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(trelloTodo).map((board) => (
            <BoardDroppable {...{ boardId: board, todos: trelloTodo[board] }} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default React.memo(Trello);
