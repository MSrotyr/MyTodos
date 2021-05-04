import './RegistrationForm.css';
import React, { useState } from 'react';
import { Register } from './RegistrationAPI';

function RegistrationForm({ registrationHandler }) {
  const [user, setUser] = useState({
    firstName: '', lastName: '', email: '', password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // api call
    const response = await Register(user);
    if (response._id) {
      registrationHandler(response._id);
    } else {
      alert('Invalid email or password');
    }
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
            required="required"
            id="firstName"
            name="firstName"
            placeholder="First name"
            onChange={(e) => { setUser({ ...user, firstName: e.target.value }); }}
            value={user.firstName}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="lastName">lastName</label>
          <input
            required="required"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            onChange={(e) => { setUser({ ...user, lastName: e.target.value }); }}
            value={user.lastName}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required="required"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => { setUser({ ...user, email: e.target.value }); }}
            value={user.email}
            type="email"
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            required="required"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => { setUser({ ...user, password: e.target.value }); }}
          />
        </div>

        <button name="submit" type="submit">Register </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
