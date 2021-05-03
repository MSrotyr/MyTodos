import './RegistrationForm.css';
import React, { useState } from 'react';

const baseUrl = 'http://localhost:3001';

function RegistrationForm({ registrationHandler }) {
  const [user, setUser] = useState({
    firstName: '', lastName: '', email: '', password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // api call
    try {
      const res = await fetch(`${baseUrl}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const response = await res.json();
      console.log(response);
      if (response._id) {
        registrationHandler(response._id);
        setUser({
          firstName: '', lastName: '', email: '', password: '',
        });
      }
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
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
