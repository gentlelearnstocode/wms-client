import React from 'react';

import { storage } from '../utils/storage';

export interface TodoItem {
  id: number;
  label: string;
  createdAt: string;
  status: string;
}

export const initialState = {
  todoList: <TodoItem[]>storage.getStorage('todoList') || [],
};

export enum ActionTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  TOGGLE_STATUS = 'TOGGLE_STATUS',
}

export type AddTodo = {
  type: ActionTypes.ADD;
  label: string;
};

export type RemoveTodo = {
  type: ActionTypes.REMOVE;
  id: number;
};

export type ToggleStatusTodo = {
  type: ActionTypes.TOGGLE_STATUS;
  id: number;
};

export type Actions = AddTodo | RemoveTodo | ToggleStatusTodo;

export const todoReducer: React.Reducer<typeof initialState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD: {
      return {
        todoList: [
          ...state.todoList,
          {
            id: new Date().valueOf(),
            label: action.label,
            createdAt: new Date().toISOString(),
            status: 'pending',
          },
        ],
      };
    }
    case ActionTypes.REMOVE: {
      const newTodoList = state.todoList.filter((todo) => todo.id !== action.id);
      return {
        todoList: newTodoList,
      };
    }
    case ActionTypes.TOGGLE_STATUS: {
      return {
        todoList: state.todoList.map((todo) =>
          todo.id === action.id ? { ...todo, status: 'complete' } : todo,
        ),
      };
    }
    default:
      return state;
  }
};
