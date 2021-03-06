import React, { VFC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Todo } from 'redux/todo/todo.actions';
import { addTodosStartAsync } from 'redux/todo/todo.actions';
import { deleteCurrentUser } from 'redux/user/user.actions';

import { SubmitButton } from 'components/Button/SubmitButton';
import { TodoContainer } from 'containers/todoContainer/todoContainer';

export const TodoPage: VFC = () => {
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');
  const storedTodos = useSelector((state: RootState) => state.todo.todos);
  const userId = useSelector((state: RootState) => state.user.currentUser) ?? '';

  const dispatch = useDispatch();

  const handleSubmit = (evt: React.FormEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const newTodo: Todo = {
      id: description + new Date().getMilliseconds(),
      description: description,
      dueDate: dueDate,
      done: false,
      createdAt: new Date(),
    };
    dispatch(addTodosStartAsync(storedTodos, newTodo, userId));
    setDescription('');
    setDueDate(new Date());
  };

  return (
    <div>
      <h1>Todo Page</h1>
      <button onClick={() => dispatch(deleteCurrentUser())}>Logout</button>
      <form>
        <input
          type="text"
          name="description"
          id="description"
          onChange={(evt) => setDescription(evt.target.value)}
          value={description}
        />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date as Date)} />
        <SubmitButton label={'登録'} handleSubmit={handleSubmit} />
      </form>
      <TodoContainer todos={storedTodos} userId={userId} />
    </div>
  );
};
