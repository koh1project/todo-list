import { Dispatch } from 'redux';
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
  return (dispatch: Dispatch<TodoAction>) => {
    const todosRef = firestore.collection('users').doc(useId);
    // const todosRef = firestore.collection('Todos').doc(useId).collection('indivisual-todos');
    dispatch(fetchTodoStart());

    todosRef
      .get()
      .then((snapshot) => {
        const todos: Todo[] = (snapshot.data()!.todos as TodoFirebase[]).map((todo) => {
          return { ...todo, dueDate: todo.dueDate.toDate() };
        });

        // const todos: Todo[] = snapshot.docs.map((doc) => {
        //   const todo = doc.data();
        //   return { ...todo, dueDate: todo.dueDate.toDate(), id: doc.id } as Todo;
        // });

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
  return (dispatch: Dispatch<TodoAction>) => {
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
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch(deleteTodoStart());

    const newTodos = todos.slice().filter((todo) => todo.id !== deleteTargetTodo.id);

    firestore
      .collection('users')
      .doc(userId)
      .set({ todos: newTodos })
      .then(() => {
        dispatch(deleteTodoSuccess(newTodos));
      })
      .catch((error: Error) => {
        dispatch(deleteTodoFailure(error.message));
      });
  };
};

export const editTodo = (todo: Todo): TodoAction => ({
  type: TodoActionTypes.EDIT_TODO_ITEM,
  payload: todo,
});

export const syncTodo = (todos: Todo[]): TodoAction => ({
  type: TodoActionTypes.SYNC_TODOS,
  payload: todos,
});

export const revertTodo = (): TodoAction => ({
  type: TodoActionTypes.REVERT_TODOS,
});

export const updateTodoStart = (): TodoAction => ({
  type: TodoActionTypes.UPDATE_TODO_START,
});

export const updateTodoSuccess = (todos: Todo[]): TodoAction => ({
  type: TodoActionTypes.UPDATE_TODO_SUCCESS,
  payload: todos,
});

export const updateTodoFailure = (errorMessage: string): TodoAction => ({
  type: TodoActionTypes.UPDATE_TODO_FAILURE,
  payload: errorMessage,
});

export const updateTodosStartAsync = (todos: Todo[], updateTargetTodo: Todo, userId: string) => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch(editTodo(updateTargetTodo)); // 通信前にUIに反映させる
    dispatch(updateTodoStart());

    const newTodos = todos.slice().map((todo) => (todo.id === updateTargetTodo.id ? updateTargetTodo : todo));

    console.log(newTodos);

    firestore
      .collection('users')
      .doc(userId)
      .update({ todos: newTodos })
      .then(() => {
        dispatch(updateTodoSuccess(newTodos));
      })
      .catch((error: Error) => {
        dispatch(updateTodoFailure(error.message));
      });
  };
};
