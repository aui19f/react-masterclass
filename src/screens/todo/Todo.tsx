import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ITodo, todoState } from "../../atom";
const Li = styled.li`
  padding: 12px;
  margin: 8px;
  display: flex;
  align-items: center;
  background-color: rgba(222, 222, 222, 0.2);
  p {
    flex: 1;
  }
  button {
    padding: 6px;
    font-size: 75%;
    margin-left: 8px;
    color: gray;
  }
`;
export default function Todo({ id, text, updateAt, category }: ITodo) {
  const setTodo = useSetRecoilState(todoState);
  //1
  // const onClick = (category: ITodo["category"]) => {
  //   console.log(">> ", category);
  // };

  //2
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setTodo((prev) => {
      const targetIndex = prev.findIndex((x) => x.id === id);
      return [
        ...prev.slice(0, targetIndex),
        {
          id,
          text,
          updateAt: new Date().getTime(),
          category: name as Categories,
        },
        ...prev.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <Li>
      <p>{text}</p>
      {/* 1. <button onClick={() => onClick("TODO")}>TODO</button> */}
      {/* 2 */}
      {category !== Categories.TODO && (
        <button name={Categories.TODO + ""} onClick={onClick}>
          TODO
        </button>
      )}

      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          DOING
        </button>
      )}

      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          DONE
        </button>
      )}
      {}
    </Li>
  );
}
