import React, { VFC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from 'firebase/firebase.utils';
import { Todo } from 'redux/todo/todo.actions';
import { addTodo, addTodosStartAsync } from 'redux/todo/todo.actions';

import { RootState } from 'redux/root-reducer';
import { SubmitButton } from 'components/Button/SubmitButton';
import { TodoContainer } from 'containers/todoContainer/todoContainer';

export const TodoPage: VFC = () => {
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');

  // TODO: テストデータ
  const userId = 'xTbimz0MSPLPw5xnKEe5';

  const storedTodos = useSelector((state: RootState) => state.todo.todos);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todosRef = firestore.collection('users').doc(userId);
    // todosRef.get().then((doc) => {
    //   setTodos(doc.data()!.todos);
    //   console.log(doc.data()!.todos);
    // });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: add test
  useEffect(() => {
    if (storedTodos.length <= 0) {
      return;
    }
    const todoItem: Todo = {
      id: '333',
      description: 'ADDtest',
      done: false,
      dueDate: new Date(),
      createdAt: new Date()
    };

    // firestore
    //   .collection('users')
    //   .doc(userId)
    //   .set({ todos: [...todos, todoItem] })
    //   .then(() => {
    //     console.log(`Add`);
    //   });
    return () => {};
  }, [storedTodos]);

  const dispatch = useDispatch();

  const handleSubmit = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const newTodo: Todo = {
      id: description + new Date().getMilliseconds(),
      description: description,
      dueDate: dueDate,
      done: false,
      createdAt: new Date()
    };

    dispatch(addTodosStartAsync(storedTodos, newTodo, userId));
  };

  return (
    <div>
      <h1>Todo Page</h1>
      <form>
        <input
          type="text"
          name="description"
          id="description"
          onChange={(evt) => setDescription(evt.target.value)}
          value={description}
        />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date as Date)} />
        <SubmitButton handleSubmit={handleSubmit} />
      </form>
      <TodoContainer todos={storedTodos} />
    </div>
  );
};
