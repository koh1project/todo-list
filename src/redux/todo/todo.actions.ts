import { firestore } from './../../firebase/firebase.utils';
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

export type TodoFirebase = Omit<Todo, 'dueDate'> & { dueDate: firebase.firestore.Timestamp };

export type TodoAction = {
  type: ValueOf<typeof TodoActionTypes>;
  payload?: Todo | Todo[] | string;
};

export const fetchTodoStart = (): TodoAction => ({
  type: TodoActionTypes.FETCH_TODOS_START,
});

export const fetchTodoSuccess = (todos: Todo[]): TodoAction => ({
  type: TodoActionTypes.FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const fetchTodoFailure = (errorMessage: string): TodoAction => ({
  type: TodoActionTypes.FETCH_TODOS_FAILURE,
  payload: errorMessage,
});

export const fetchTodosStartAsync = (useId: string) => {
  return (dispatch: Function) => {
    const todosRef = firestore.collection('users').doc(useId);
    dispatch(fetchTodoStart());

    todosRef
      .get()
      .then((snapshot) => {
        const todos: Todo[] = (snapshot.data()!.todos as TodoFirebase[]).map((todo) => {
          return { ...todo, dueDate: todo.dueDate.toDate() };
        });

        return dispatch(fetchTodoSuccess(todos));
      })
      .catch((error: Error) => dispatch(fetchTodoFailure(error.message)));
  };
};

export const addTodoStart = (): TodoAction => ({
  type: TodoActionTypes.ADD_TODO_START,
});

export const addTodoSuccess = (todos: Todo[]): TodoAction => ({
  type: TodoActionTypes.ADD_TODO_SUCCESS,
  payload: todos,
});

export const addTodoFailure = (errorMessage: string): TodoAction => ({
  type: TodoActionTypes.ADD_TODO_FAILURE,
  payload: errorMessage,
});

export const addTodosStartAsync = (todos: Todo[], addedTodo: Todo, userId: string) => {
  return (dispatch: Function) => {
    dispatch(addTodoStart());

    const newTodos = [...todos, addedTodo];

    firestore
      .collection('users')
      .doc(userId)
      .set({ todos: newTodos })
      .then(() => {
        dispatch(addTodoSuccess(newTodos));
      })
      .catch((error: Error) => {
        dispatch(revertTodo());
        dispatch(addTodoFailure(error.message));
      });
  };
};

export const deleteTodoStart = (): TodoAction => ({
  type: TodoActionTypes.DELETE_TODO_START,
});
export const deleteTodoSuccess = (todo: Todo[]): TodoAction => ({
  type: TodoActionTypes.DELETE_TODO_SUCCESS,
  payload: todo,
});
export const deleteTodoFailure = (errorMessage: string): TodoAction => ({
  type: TodoActionTypes.DELETE_TODO_FAILURE,
  payload: errorMessage,
});

export const deleteTodosStartAsync = (todos: Todo[], deleteTargetTodo: Todo, userId: string) => {
  return (dispatch: Function) => {
    dispatch(deleteTodoStart());

    const newTodos = todos.slice().filter((todo) => todo.id !== deleteTargetTodo.id);

    firestore
      .collection('users')
      .doc(userId)
      .set({ todos: newTodos })
      .then(() => {
        console.log(`Delete`);
        console.log(userId);

        dispatch(deleteTodoSuccess(newTodos));
      })
      .catch((error: Error) => {
        dispatch(revertTodo());
        dispatch(deleteTodoFailure(error.message));
      });
  };
};

export const editTodo = (todo: Todo): TodoAction => ({
  type: TodoActionTypes.UPDATE_TODO_ITEM,
  payload: todo,
});

export const syncTodo = (todos: Todo[]): TodoAction => ({
  type: TodoActionTypes.SYNC_TODOS,
  payload: todos,
});

export const revertTodo = (): TodoAction => ({
  type: TodoActionTypes.REVERT_TODOS,
});

// @TODO: update start
// @TODO: update success
// @TODO: update failure
