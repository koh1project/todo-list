import React, { useState, useEffect } from 'react';

import { Route } from 'react-router-dom';
import Login from './pages/login/login';

import { firestore } from 'firebase/firebase.utils';
import { Todo } from 'redux/todo/todo.actions';
import { addTodo } from 'redux/todo/todo.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';
import { TodoContainer } from 'containers/todoContainer/todoContainer';
import { SubmitButton } from 'components/Button/SubmitButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
  // TODO: テストデータ
  const userId = 'xTbimz0MSPLPw5xnKEe5';

  const storedTodos = useSelector((state: RootState) => state.todo.todos);

  useEffect(() => {
    const todosRef = firestore.collection('users').doc(userId);
    // todosRef.get().then((doc) => {setTodos(doc.data()!.todos);console.log(doc.data()!.todos);});
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
    // firestore.collection('users').doc(userId).set({ todos: [...todos, todoItem] }).then(() => {console.log(`Add`);});
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

    dispatch(addTodo(newTodo));
  };

  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>('');

  return (
    <div className="App">
      <h1>TEST</h1>
      <Route path={'/login'} component={Login} />
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

export default App;
