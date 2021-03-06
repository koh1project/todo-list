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
        todos: [...state.todos, action.payload as Todo]
      };
    case TodoActionTypes.DELETE_TODO_ITEM:
      return {
        ...state,
        todos: state.todos.slice().filter((todo) => todo.id !== (action.payload as Todo).id)
      };
    case TodoActionTypes.UPDATE_TODO_ITEM:
      const editedTodo = action.payload as Todo;
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === editedTodo?.id ? editedTodo : todo))
      };
    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.payload as Todo[] };
    default:
      return state;
  }
};
