import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDragabbleCardProps {
  index: number;
  todo: string;
}

export default function CardDraggable({ index, todo }: IDragabbleCardProps) {
  return (
    <>
      <Draggable draggableId={todo} index={index}>
        {(param1) => (
          <Card
            ref={param1.innerRef}
            {...param1.draggableProps}
            {...param1.dragHandleProps}
          >
            {todo}
          </Card>
        )}
      </Draggable>
    </>
  );
}
