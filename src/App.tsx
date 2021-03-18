import React, { VFC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';

import { Login } from './pages/login/login';
import { TodoPage } from 'pages/todo/todo';

import './App.scss';

const App: VFC = () => {
  const userId = useSelector((state: RootState) => state.user.currentUser) ?? null;

  const routes = userId ? (
    <Switch>
      <Route path={'/login'} component={Login} />
      <Route path={'/'} component={TodoPage} exact />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path={'/login'} component={Login} />
      {/* <Route path={'/'} component={TodoPage} exact /> */}
      <Redirect to="/login" />
    </Switch>
  );

  return <div className="App">{routes}</div>;
};

export default App;
