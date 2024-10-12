import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoObj, trelloTodoState } from "../../atom";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  p {
    flex: 1;
  }
`;

interface IDragabbleCardProps {
  index: number;
  todo: string;
  id: number;
  boardId: string;
}

export default function CardDraggable({
  id,
  index,
  todo,
  boardId,
}: IDragabbleCardProps) {
  const [trelloTodo, setTrelloTodo] = useRecoilState(trelloTodoState);

  const onClick = () => {
    console.log(">>", boardId, index, id, todo);

    setTrelloTodo((allBoards: ITodoObj) => {
      const copyToDos: ITodoObj = {};
      Object.keys(allBoards).forEach((toDosKey) => {
        copyToDos[toDosKey] = [...allBoards[toDosKey]];
      });
      copyToDos[boardId].splice(index, 1);
      return copyToDos;
    });
  };
  return (
    <>
      <Draggable draggableId={todo} index={index}>
        {(param1, snapshot) => (
          <Card
            ref={param1.innerRef}
            isDragging={snapshot.isDragging}
            {...param1.draggableProps}
            {...param1.dragHandleProps}
          >
            <p>{todo}</p>
            <button onClick={onClick}>X</button>
          </Card>
        )}
      </Draggable>
    </>
  );
}
