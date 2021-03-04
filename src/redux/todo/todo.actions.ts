import { firestore, FirebaseDocumentDataType } from './../../firebase/firebase.utils';
import { ValueOf } from 'redux/redux.utils';
import { TodoActionTypes } from 'redux/todo/todo.types';
import firebase from 'firebase';

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
  payload?: Todo | Todo[] | string;
};

export const fetchTodoStart = (): TodoAction => ({
  type: TodoActionTypes.FETCH_TODOS_START
});

export const fetchTodoSuccess = (todos: Todo[]): TodoAction => ({
  type: TodoActionTypes.FETCH_TODOS_SUCCESS,
  payload: todos
});

export const fetchTodoFailure = (errorMessage: string): TodoAction => ({
  type: TodoActionTypes.FETCH_TODOS_FAILURE,
  payload: errorMessage
});

export const fetchTodosStartAsync = (useId: string) => {
  return (dispatch: Function) => {
    const todosRef = firestore.collection('users').doc(useId);
    dispatch(fetchTodoStart());

    todosRef
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        const todos = [] as Todo[];
        return dispatch(fetchTodoSuccess(todos));
      })
      .catch((error: Error) => dispatch(fetchTodoFailure(error.message)));
  };
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
  type: TodoActionTypes.UPDATE_TODO_ITEM,
  payload: todo
});
