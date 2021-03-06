export const TodoActionTypes = {
  FETCH_TODOS_START: 'FETCH_TODOS_START',
  FETCH_TODOS_SUCCESS: 'FETCH_TODOS_SUCCESS',
  FETCH_TODOS_FAILURE: 'FETCH_TODOS_FAILURE',
  ADD_TODO_ITEM: 'ADD_TODO_ITEM',
  DELETE_TODO_ITEM: 'DELETE_TODO_ITEM',
  EDIT_TODO_ITEM: 'EDIT_TODO_ITEM',
  SYNC_TODOS: 'SYNC_TODOS',
  REVERT_TODOS: 'REVERT_TODOS',
  ADD_TODO_START: 'ADD_TODO_START',
  ADD_TODO_SUCCESS: 'ADD_TODO_SUCCESS',
  ADD_TODO_FAILURE: 'ADD_TODO_FAILURE',
  DELETE_TODO_START: 'DELETE_TODO_START',
  DELETE_TODO_SUCCESS: 'DELETE_TODO_SUCCESS',
  DELETE_TODO_FAILURE: 'DELETE_TODO_FAILURE',
  UPDATE_TODO_START: 'UPDATE_TODO_START',
  UPDATE_TODO_SUCCESS: 'UPDATE_TODO_SUCCESS',
  UPDATE_TODO_FAILURE: 'UPDATE_TODO_FAILURE',
} as const;
