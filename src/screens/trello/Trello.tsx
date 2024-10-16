import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, ITodoObj, trelloTodoState } from "../../atom";
import BoardDroppable from "./BoardDroppable";

const Header = styled.div`
  background-color: rgba(222, 222, 222, 1);
  height: 80px;
`;
const Contents = styled.div`
  background-color: rgba(222, 222, 222, 0.2);
  padding: 40px;
`;
const Wrapper = styled.div`
  width: 100%;
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
  const { register, handleSubmit, setValue } = useForm<{ input: string }>();

  const submit = ({ input }: { input: string }) => {
    setTrelloTodo((oldBoards) => {
      const copyBoards: ITodoObj = {};

      Object.keys(oldBoards).forEach((x) => {
        copyBoards[x] = [...oldBoards[x]];
      });

      const newBoard: ITodoObj = {};
      newBoard[input] = [];
      return { ...copyBoards, ...newBoard };
    });

    setValue("input", "");
  };

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setTrelloTodo((allBoards) => {
      const copyToDos: ITodoObj = {};

      Object.keys(allBoards).forEach((toDosKey) => {
        copyToDos[toDosKey] = [...allBoards[toDosKey]];
      });

      const copyData = copyToDos[source.droppableId][source.index];

      if (copyData) {
        copyToDos[source.droppableId].splice(source.index, 1);
        copyToDos[destination.droppableId].splice(destination.index, 0, {
          ...copyData,
        });
      }

      return copyToDos;
    });
  };
  return (
    <>
      <Header>
        <h3>Trello</h3>

        <form onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            {...register("input", { required: "보드이름을 입력해주세요." })}
          />
          <button>ADD</button>
        </form>
      </Header>
      <Contents>
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(trelloTodo).map((board) => (
                <BoardDroppable
                  {...{ boardId: board, todos: trelloTodo[board] }}
                />
              ))}
            </Boards>
          </Wrapper>
        </DragDropContext>
      </Contents>
    </>
  );
}

export default React.memo(Trello);
