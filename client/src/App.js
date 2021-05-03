import React, { useState, createContext } from 'react';

import './App.css';
import { AllLists } from './Containers/AllLists/AllLists'; // eslint-disable-line
import { SelectedList } from './Containers/SelectedList/SelectedList'; // eslint-disable-line
import LoginForm from './Containers/LoginForm/LoginForm';
import RegistrationForm from './Containers/RegistrationForm/RegistrationForm';

export const UserIdContext = createContext(null);
function App() {
  const [userId, setUserId] = useState('');

  const handleCallback = (id) => setUserId(id);

  return (
    <div className="App">
      <main className="main">
        {userId ? (
          <UserIdContext.Provider value={userId}>
            <AllLists />
            <SelectedList />
          </UserIdContext.Provider>
        ) : (
          <div className="login-container">
            <LoginForm loginHandler={handleCallback} />
            <RegistrationForm registrationHandler={handleCallback} />
          </div>
        )}
      </main>
      <footer />
    </div>
  );
}

export default App;
