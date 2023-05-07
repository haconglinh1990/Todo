import {create} from 'zustand';
import ITodo from '../models/ITodo';

type TodoStore = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  addTodo: (todo: ITodo) => void;
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (id: number) => void;
};
export const useTodoStore = create<TodoStore>(set => ({
  todos: [],
  setTodos: (todos: ITodo[]) =>
    set(state => ({todos: [...new Set([...state.todos, ...todos])]})),
  addTodo: todo => set(state => ({todos: [todo, ...state.todos]})),
  updateTodo: todo =>
    set(state => ({
      todos: state.todos.map(td =>
        td.id === todo.id && td.userId === todo.userId ? todo : td,
      ),
    })),
  deleteTodo: (id: number) =>
    set(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    })),
}));
