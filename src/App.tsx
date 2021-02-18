import React, { useState, useEffect } from 'react';

import { Route } from 'react-router-dom';
import Login from './pages/login/login';

import { firestore } from 'firebase/firebase.utils';
import { Todo } from 'redux/todo/todo.actions';
import firebase from 'firebase';

const App = () => {
  // TODO: テストデータ
  const userId = 'xTbimz0MSPLPw5xnKEe5';
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const todosRef = firestore.collection('users').doc(userId);
    todosRef.get().then((doc) => {
      setTodos(doc.data()!.todos);
      console.log(doc.data()!.todos);
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: add test
  useEffect(() => {
    console.log(todos.length);

    if (todos.length <= 0) {
      return;
    }
    const todoItem: Todo = {
      id: '333',
      description: 'ADDtest',
      done: false,
      dueDate: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now()
    };
    firestore
      .collection('users')
      .doc(userId)
      .set({ todos: [...todos, todoItem] })
      .then(() => {
        console.log(`Add`);
      });
    return () => {};
  }, [todos]);

  return (
    <div className="App">
      <h1>TEST</h1>
      <Route path={'/login'} component={Login} />
    </div>
  );
};

export default App;
