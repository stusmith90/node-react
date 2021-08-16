import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';


const submitForm = (e) => {
  e.preventDefault();
  axios
    .post(`/api/signin`, {
      email: 'stu@gmail.com',
      password: 'pass1234',
    })
    .then((res) => {
      console.log(res.data);
    });
};

const getResults = (e, dispatch) => {
  e.preventDefault();
};

function Login() {
  const dispatch = useDispatch();
  return (
    <div className="login">
      <form onSubmit={submitForm}>
        <input type="email" placeholder="Email" name="Email"></input>
        <input type="password" placeholder="Password" name="Password"></input>
        <button>Submit</button>
      </form>

      <form onSubmit={(e) => getResults(e, dispatch)}>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
