// Standard interface and functions

import create from "zustand";
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// zustand
// we are creating a store
type TodoStore = {
  todos: Todo[];
  newTodo: string;
  addTodo: () => void;
  setNewTodo: (newTodo: string) => void;
  update: (id: number, text: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  load: (todos: Todo[]) => void;
};

// initialising the store
const useStore = create<TodoStore>((set) => ({
  todos: [],
  newTodo: "",
  load: (todos: Todo[]) => {
    set((state) => ({
      ...state,
      todos,
    }));
  },
  addTodo: () => {
    set((state) => ({
      todos: addTodo(state.todos, state.newTodo),
      newTodo: "",
    }));
  },
  setNewTodo: (newTodo: string) => {
    set((state) => ({
      ...state,
      newTodo,
    }));
  },
  update: (id: number, text: string) => {
    set((state) => ({
      ...state,
      todos: updateTodo(state.todos, id, text),
    }));
  },
  toggle: (id: number) => {
    set((state) => ({
      ...state,
      todos: toggleTodo(state.todos, id),
    }));
  },
  remove: (id: number) => {
    set((state) => ({
      ...state,
      todos: removeTodo(state.todos, id),
    }));
  },
}));

export default useStore;
