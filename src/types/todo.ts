import type { Dispatch, SetStateAction } from 'react';

export interface CreateTodo {
  title: string;
  content?: string;
  due_date?: string;
  done: boolean;
}

export type ReadTodo = CreateTodo & { id: string };

export type OpenAddTodoFormBtnProps = {
  setTodos: Dispatch<SetStateAction<ReadTodo[]>>;
};

export type TodoListProps = OpenAddTodoFormBtnProps & { todos: ReadTodo[] };

export type TodoFormProps = OpenAddTodoFormBtnProps & {
  setIsOpen: (b: boolean) => void;
};

export type SortProps = { sortValue: (newSortValue: string) => void };

export type FilterProps = { filterValue: (newFilterValue: string) => void };
