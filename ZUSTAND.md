# ZUSTAND - State manager
From this very example, Zustand is a very appealing choice to me when deciding on an state manager. Because I now take TypeScript angle towards development, I'll be narrating the code and setup according to that.

## Install and Import
To install zustand, it is like any other package library:
`yarn add zustand`

To import zustand into a project:
`import create from 'zustand'`


## Defining the store
```
<!-- define store structure with type -->
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

<!-- initialising the store with type -->
const useStore = create<TodoStore>((set) => ({
  todos: [],
  newTodo: "",
  load: (todos: Todo[]) => {
    set((state) => ({
      ...state,
      todos,
    }));
  },
  ...
}))
```

## Usage
The store can then be used anywhere in the application where it is <b>needed</b>, by importing it like so:
`import useStore from "../store";`

The store can be accessed by creating an instance of the store as per below, which allows you to make use of any logic within the store in a specified component:
```
function TodoAdd() {
  const store = useStore();
  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input
        placeholder="New todo"
        value={store.newTodo}
        onChange={(e) => store.setNewTodo(e.target.value)}
      />
      <Button onClick={() => store.addTodo()}>Add Todo</Button>
    </Grid>
  );
}
```
