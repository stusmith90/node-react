import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCounter } from './redux/actions';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login';

function App() {
  const [data, setData] = React.useState(null);
  const counter = useSelector((state) => state.app.counter);
  const dispatch = useDispatch();

  console.log(counter);

  useEffect(() => {
    fetch('/api/me')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? 'Loading...' : data}</p>
        <p>{counter}</p>
        <button onClick={() => dispatch(addCounter())}>add counter</button>
      </header>

      <Switch>
                <Route path="/login" component={Login} exact />
            </Switch>
    </div>
  );
}

export default App;
