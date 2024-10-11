import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { trelloTodoState } from "../../atom";
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
    setTrelloTodo((oldToDos) => {
      const list = [...oldToDos[source.droppableId]];
      if (destination) {
        list.splice(source.index, 1);
        list.splice(destination?.index, 0, draggableId);
      }
      return { ...oldToDos, [source.droppableId]: list };
    });

    // setTrelloTodo((oldToDos) => {
    //   const list = [...oldToDos];
    //   list.splice(source.index, 1);
    //   list.splice(destination?.index, 0, draggableId);
    //   return list;
    // });
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
