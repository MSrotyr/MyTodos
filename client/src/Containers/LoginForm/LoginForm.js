import './LoginForm.css';
import React, { useState } from 'react';
import { Login } from './LoginApi';

function LoginForm({ loginHandler }) {
  const [user, setUser] = useState({
    email: '', password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // api call
    const response = await Login(user);
    console.log(response);
    if (response._id) {
      loginHandler(response._id);
    } else {
      alert('Invalid email or password');
    }
    setUser({
      email: '', password: '',
    });
  };

  return (

    <div className="formDiv">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="emailLogin"
            name="email"
            placeholder="email"
            onChange={(e) => { setUser({ ...user, email: e.target.value }); }}
            value={user.email}
            type="email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="passwordLogin"
            name="password"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => { setUser({ ...user, password: e.target.value }); }}
          />
        </div>

        <button name="submit" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
