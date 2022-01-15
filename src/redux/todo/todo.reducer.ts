import { Todo } from 'redux/todo/todo.actions';
import { Reducer } from 'redux';
import { TodoActionTypes } from './todo.types';
import { TodoAction } from './todo.actions';

export type TodoState = { todos: Todo[]; previousTodos: Todo[]; isLoading: boolean };
export const INITIAL_STATE: TodoState = { todos: [], previousTodos: [], isLoading: false };

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state: TodoState = INITIAL_STATE,
  action: TodoAction,
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS_START:
    case TodoActionTypes.ADD_TODO_START:
    case TodoActionTypes.DELETE_TODO_START:
      return { ...state, isLoading: true };
    case TodoActionTypes.ADD_TODO_ITEM:
      return {
        ...state,
        previousTodos: state.todos,
        todos: [...state.todos, action.payload as Todo],
      };
    case TodoActionTypes.DELETE_TODO_ITEM:
      return {
        ...state,
        previousTodos: state.todos,
        todos: state.todos.slice().filter((todo) => todo.id !== (action.payload as Todo).id),
      };
    case TodoActionTypes.EDIT_TODO_ITEM:
      const editedTodo = action.payload as Todo;
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === editedTodo?.id ? editedTodo : todo)),
      };
    case TodoActionTypes.FETCH_TODOS_SUCCESS:
      const fetchedTodos = action.payload as Todo[];
      return { ...state, previousTodos: fetchedTodos, todos: fetchedTodos, isLoading: false };
    case TodoActionTypes.ADD_TODO_SUCCESS:
    case TodoActionTypes.DELETE_TODO_SUCCESS:
    case TodoActionTypes.UPDATE_TODO_SUCCESS:
    case TodoActionTypes.SYNC_TODOS:
      // Sync
      return { ...state, previousTodos: state.todos, todos: action.payload as Todo[], isLoading: false };
    case TodoActionTypes.REVERT_TODOS:
    case TodoActionTypes.ADD_TODO_FAILURE:
    case TodoActionTypes.DELETE_TODO_FAILURE:
    case TodoActionTypes.UPDATE_TODO_FAILURE:
      // Revert
      return { ...state, todos: state.previousTodos as Todo[], isLoading: false };
    case TodoActionTypes.FETCH_TODOS_FAILURE:
      return { ...state, todos: [], isLoading: false };
    default:
      return state;
  }
};
