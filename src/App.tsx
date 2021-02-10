import React from 'react';

import { Route } from 'react-router-dom';
import Login from './pages/login/login';

const App = () => {
  return (
    <div className="App">
      <h1>TEST</h1>
      <Route path={'/login'} component={Login} />
    </div>
  );
};

export default App;
