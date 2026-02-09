export interface CreateTodo {
  title: string;
  content?: string;
  due_date?: string | null;
  done: boolean;
}

export type ReadTodo = CreateTodo & { id: string };

export type TodoFormProps = {
  setIsOpen: (b: boolean) => void;
};
