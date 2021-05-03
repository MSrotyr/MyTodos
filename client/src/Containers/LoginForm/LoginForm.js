import './LoginForm.css';
import React, { useState } from 'react';

const baseUrl = 'http://localhost:3001';

function LoginForm({ loginHandler }) {
  const [user, setUser] = useState({
    email: '', password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // api call
    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const response = await res.json();
      if (response._id) {
        loginHandler(response._id);
      }
      setUser({
        email: '', password: '',
      });
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  };

  return (

    <div className="formDiv">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={(e) => { setUser({ ...user, email: e.target.value }); }}
            value={user.email}
            type="email"
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={(e) => { setUser({ ...user, password: e.target.value }); }}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
