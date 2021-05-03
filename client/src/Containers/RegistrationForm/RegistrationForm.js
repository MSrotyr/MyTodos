import './RegistrationForm.css';
import React, { useState } from 'react';

function RegistrationForm({ createHandler }) {
  const [user, setUser] = useState({
    firstName: '', lastName: '', email: '', password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // api call
    await createHandler(user);
    // reset form
    setUser({
      firstName: '', lastName: '', email: '', password: '',
    });
  };

  return (

    <div className="formDiv">
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="firstName">firstName</label>
          <input
            id="firstName"
            name="firstName"
            onChange={(e) => { setUser({ ...user, firstName: e.target.value }); }}
            value={user.firstName}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="lastName">lastName</label>
          <input
            id="lastName"
            name="lastName"
            onChange={(e) => { setUser({ ...user, lastName: e.target.value }); }}
            value={user.last}
            type="text"
          />
        </div>
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

        <button type="submit">Register </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
