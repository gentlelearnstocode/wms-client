import { createContext, ReactNode, useEffect, useReducer } from 'react';

import { ActionTypes, initialState, TodoItem, todoReducer } from '@stores/todo';
import { storage } from '../utils/storage';

type TodoContextType = {
  todoList: TodoItem[];
  addTodoItem: (label: string) => void;
  removeTodoItem: (id: number) => void;
  toggleStatus: (id: number) => void;
};

export const TodoListContext = createContext<TodoContextType | null>(null);

type TodoListProvider = {
  children: ReactNode;
};

export const TodoListProvider = ({ children }: TodoListProvider) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    storage.setStorage('todoList', state.todoList);
  }, [state.todoList]);

  const value: TodoContextType = {
    todoList: state.todoList,
    addTodoItem: (label: string) => dispatch({ type: ActionTypes.ADD, label }),
    removeTodoItem: (id: number) => dispatch({ type: ActionTypes.REMOVE, id }),
    toggleStatus: (id: number) => dispatch({ type: ActionTypes.TOGGLE_STATUS, id }),
  };
  return <TodoListContext.Provider value={value}>{children}</TodoListContext.Provider>;
};
