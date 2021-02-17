import { ValueOf } from 'redux/redux.utils';
import { TodoActionTypes } from 'redux/todo/todo.types';

import * as firebase from 'firebase/app';
type Timestamp = firebase.default.firestore.Timestamp;

export type Todo = {
  id: string;
  userId?: string;
  description: string;
  done: boolean;
  dueDate: Timestamp;
  createdAt: Timestamp;
};

export type TodoAction = {
  type: ValueOf<typeof TodoActionTypes>;
  payload: Todo | string;
};

export const addTodo = (todo: Todo): TodoAction => ({
  type: TodoActionTypes.ADD_TODO_ITEM,
  payload: todo
});
