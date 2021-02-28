import { ValueOf } from 'redux/redux.utils';
import { TodoActionTypes } from 'redux/todo/todo.types';

import firebase from 'firebase';
type Timestamp = firebase.firestore.Timestamp;

export type Todo = {
  id: string;
  userId?: string;
  description: string;
  done: boolean;
  dueDate: Date;
  createdAt: Date;
};

export type TodoAction = {
  type: ValueOf<typeof TodoActionTypes>;
  payload: Todo;
};

export const addTodo = (todo: Todo): TodoAction => ({
  type: TodoActionTypes.ADD_TODO_ITEM,
  payload: todo
});

export const deleteTodo = (todo: Todo): TodoAction => ({
  type: TodoActionTypes.DELETE_TODO_ITEM,
  payload: todo
});

export const editTodo = (todo: Todo): TodoAction => ({
  type: TodoActionTypes.EDIT_TODO_ITEM,
  payload: todo
});
