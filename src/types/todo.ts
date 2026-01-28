import type { Dispatch, SetStateAction } from 'react';

export interface CreateTodo {
  title: string;
  content?: string;
  due_date?: string;
  done: boolean;
}

export type ReadTodo = CreateTodo & {  id: number;}

export type TodoListProps = {
  todos: ReadTodo[];
};

export type OpenAddTodoFormBtnProps = TodoListProps &   {setTodos: Dispatch<SetStateAction<ReadTodo[]>>}

export type TodoFormProps = OpenAddTodoFormBtnProps & {  setIsOpen: (b: boolean) => void;}


