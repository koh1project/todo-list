import { useEffect, VFC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/root-reducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Login } from './pages/login/login';
import { TodoPage } from 'pages/todo/todo';

import './App.scss';
import { auth } from 'firebase/firebase.utils';
import { setCurrentUser } from 'redux/user/user.actions';

const App: VFC = () => {
  const userId = useSelector((state: RootState) => state.user.currentUser) ?? null;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      history.push('/');
    }
  }, [userId, history]);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log('userChange: ', user);
      dispatch(setCurrentUser(user.uid));
    }
  });

  const routes = (
    <Switch>
      <Route path={'/login'} component={Login} exact />
      <Route exact path="/" render={() => (userId ? <TodoPage /> : <Redirect to="/login" />)} />
    </Switch>
  );
  return <div className="App">{routes}</div>;
};

export default App;
