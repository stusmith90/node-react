import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(counter);

useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
