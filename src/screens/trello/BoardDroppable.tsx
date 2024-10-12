import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ITodo, ITodoObj, trelloTodoState } from "../../atom";
import CardDraggable from "./CardDraggable";

const Title = styled.div`
  margin-bottom: 12px;
  input {
    margin-top: 8px;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    border: 1px solid lightgray;
    padding: 4px;
  }
`;

const Board = styled.div`
  padding: 12px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;

  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.1);
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(0,0,0,.7)"
      : props.isDraggingFromThis
      ? "gray"
      : ""};

  flex-grow: 1;
`;
interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  boardId: string;
  todos: ITodo[];
}

export default function BoardDroppable({ boardId, todos }: IBoardProps) {
  const [trelloTodo, setTrelloTodo] = useRecoilState(trelloTodoState);
  const { register, handleSubmit, setValue } = useForm<{ input: string }>();
  const submit = ({ input }: { input: string }) => {
    setTrelloTodo((todoOld) => {
      const copyData: ITodoObj = {};
      Object.keys(todoOld).forEach((todoKey) => {
        copyData[todoKey] = [...todoOld[todoKey]];
      });

      copyData[boardId].push({
        id: new Date().getTime(),
        text: input,
        updateAt: new Date().getTime(),
        category: boardId.toUpperCase() as Categories,
      });
      return copyData;
    });
    setValue("input", "");
  };
  return (
    <Board>
      <Title>
        <h2>{boardId.toUpperCase()}</h2>
        <form onSubmit={handleSubmit(submit)}>
          <input type="text" {...register("input")} />
        </form>
      </Title>
      <Droppable droppableId={boardId}>
        {(arg1, snapshot) => (
          <Area
            ref={arg1.innerRef}
            {...arg1.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {todos.map((todo, index) => (
              <CardDraggable
                key={todo.id}
                {...{
                  index,
                  id: todo.id,
                  todo: todo.text,
                  boardId,
                }}
              />
            ))}
            {arg1.placeholder}
          </Area>
        )}
      </Droppable>
    </Board>
  );
}
