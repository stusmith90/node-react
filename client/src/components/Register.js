import React from 'react';
import axios from 'axios';

const submitForm = (e) => {
  e.preventDefault();
  axios
    .post(`/api/signup`, {
      name: 'test',
      email: 'stu@gmail.com',
      password: 'pass1234',
    })
    .then((res) => {
      console.log(res.data);
    });
};

function Register() {
  return (
    <>
      <form submit={submitForm}>
        <input type="text" placeholder="Name" name="Name"></input>
        <input type="email" placeholder="Email" name="Email"></input>
        <input type="password" placeholder="Password" name="Password"></input>
        <input
          type="password"
          placeholder="Confirm Password"
          name="cPassword"
        ></input>
      </form>
    </>
  );
}

export default Register;
