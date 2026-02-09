import { create } from 'zustand';
import type { ReadTodo } from './types/todo';
import {
  addTodoToApi,
  deleteTodoFromApi,
  editTodoInApi,
  fetchTodosFromApi,
} from './api/api';

interface TodoState {
  todos: ReadTodo[];
  todoPromise: Promise<ReadTodo[]>;
  sort: string;
  filter: string;
  setTodos: (todos: ReadTodo[]) => void;
  resetTodoPromise: () => void;
  setSort: (sort: string) => void;
  setFilter: (filter: string) => void;
  loadTodos: () => Promise<void>;
  addTodo: (formData: FormData) => Promise<void>;
  editTodo: (todoId: string, updates: Partial<ReadTodo>) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
  errorMsg: unknown | null;
  setErrorMsg: (error: unknown | null) => void;
}

export const useStore = create<TodoState>((set) => ({
  todos: [],
  todoPromise: fetchTodosFromApi(),
  sort: '',
  filter: '',
  setTodos: (todos) => set({ todos }),
  resetTodoPromise: () => set({ todoPromise: fetchTodosFromApi() }),
  setSort: (sort) => set({ sort }),
  setFilter: (filter) => set({ filter }),
  errorMsg: null,
  setErrorMsg: (error) => set({ errorMsg: error }),

  loadTodos: async () => {
    try {
      const initialTodos = await fetchTodosFromApi();
      set({ todos: initialTodos });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  addTodo: async (formData) => {
    const newTodo = await addTodoToApi(formData);

    set((state) => ({
      todos: [...state.todos, newTodo],
    }));
  },

  editTodo: async (todoId, updates) => {
    try {
      await editTodoInApi(todoId, updates);

      set((state) => ({
        todos: state.todos.map((t) => {
          if (t.id === todoId) {
            return { ...t, ...updates };
          } else {
            return t;
          }
        }),
      }));
    } catch (err) {
      set({ errorMsg: err });
      throw err;
    }
  },

  deleteTodo: async (todoId) => {
    try {
      await deleteTodoFromApi(todoId);

      set((state) => ({
        todos: state.todos.filter((t) => t.id !== todoId),
      }));
    } catch (err) {
      set({ errorMsg: err });
      throw err;
    }
  },
}));

export const getSortedTodos = (state: TodoState) => {
  let filteredTodos = [...state.todos];
  if (state.filter === 'undone') {
    filteredTodos = filteredTodos.filter((t) => !t.done);
  } else if (state.filter === 'done') {
    filteredTodos = filteredTodos.filter((t) => t.done);
  }

  const sorted = [...filteredTodos];

  if (state.sort === 'name') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.sort === 'due-date') {
    sorted.sort((a, b) => {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return a.due_date.localeCompare(b.due_date);
    });
  }

  return sorted;
};
