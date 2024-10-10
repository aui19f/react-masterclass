import React from "react";
import { useRecoilState } from "recoil";
import { Categories, selectCategory } from "../../atom";
import Create from "./Create";
import List from "./List";

export default function Main() {
  const [category, setCategory] = useRecoilState(selectCategory);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as Categories);
  };
  return (
    <div>
      <select onInput={onInput}>
        <option value={Categories.TODO + ""}>TODO</option>
        <option value={Categories.DOING + ""}>DOING</option>
        <option value={Categories.DONE + ""}>DONE</option>
      </select>
      <Create />
      <List />
    </div>
  );
}
