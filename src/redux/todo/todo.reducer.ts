import { Todo } from 'redux/todo/todo.actions';
import { Reducer } from 'redux';
import { TodoActionTypes } from './todo.types';
import { TodoAction } from './todo.actions';

export type TodoState = { todos: Todo[] };
export const INITIAL_STATE: TodoState = { todos: [] };

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = INITIAL_STATE,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO_ITEM:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case TodoActionTypes.DELETE_TODO_ITEM:
      console.log(action.payload.id);
      return {
        ...state,
        todos: state.todos.slice().filter((todo) => todo.id !== action.payload.id)
      };
    default:
      return state;
  }
};
