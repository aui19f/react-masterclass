import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface ITodo {
  id: number;
  text: string;
  updateAt: number;
  category: Categories; //"TODO" | "DOING" | "DONE";
}

export const todoState = atom<ITodo[]>({
  key: "todos",
  default: [],
});

//
export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const allTodo = get(todoState);
    const selector = get(selectCategory);
    return allTodo.filter((todo) => todo.category === selector);
  },
});

//사용자가 선택한 카테고리를 저장
export const selectCategory = atom({
  key: "category",
  default: Categories.TODO,
});

export const minuteState = atom({
  key: "minute",
  default: 0,
});

export const hoursSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newHours) => {
    const minutes = Number(newHours) * 60;
    set(minuteState, minutes);
  },
});

export interface ITodoObj {
  [key: string]: string[];
}
export const trelloTodoState = atom<ITodoObj>({
  key: "trelloTodoState",
  default: {
    todo: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});
