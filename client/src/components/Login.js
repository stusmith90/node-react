import React from 'react';
import axios from 'axios';

function Login(props) {
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

  const getResults = (e) => {
    e.preventDefault();
        fetch('/api/me')
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="login">
      <form onSubmit={submitForm}>
        <button>Submit</button>
      </form>

      <form onSubmit={getResults}>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
