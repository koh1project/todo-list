import React from 'react';

import { Route } from 'react-router-dom';
import Login from './pages/login/login';

import { TodoPage } from 'pages/todo/todo';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Route path={'/login'} component={Login} />
      <Route path={'/'} component={TodoPage} exact />
    </div>
  );
};

export default App;
