import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import { ITodo, selectCategory, todoState } from "../../atom";

const Form = styled.form``;
const Input = styled.input`
  height: 48px;
  border: 1px solid orange;
  padding: 0 8px;
`;

const Button = styled.button`
  height: 48px;
  border: 1px solid orange;
  background-color: orange;
  color: #ffffff;
`;

interface IText {
  text: string;
}

export default function Create() {
  const setTodo = useSetRecoilState<ITodo[]>(todoState);
  const category = useRecoilValue(selectCategory);
  const { register, setValue, handleSubmit } = useForm<ITodo>();
  const onSubmit = ({ text }: IText) => {
    setTodo((prev) => [
      {
        id: new Date().getTime(),
        text,
        updateAt: new Date().getTime(),
        category: category,
      },
      ...prev,
    ]);
    setValue("text", "");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("text", { required: "필수입력입니다" })}
        placeholder="해야할 일"
      />
      <Button>입력</Button>
    </Form>
  );
}
