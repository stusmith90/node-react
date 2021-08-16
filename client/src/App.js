import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCounter } from './redux/actions';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { authCheck } from './redux/actions';

function App() {
  const counter = useSelector((state) => state.app.counter);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(authCheck());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{counter}</p>
        <button onClick={() => dispatch(addCounter())}>add counter</button>
      </header>

      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <PrivateRoute path="/profile" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
