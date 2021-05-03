import React, { useState, createContext } from 'react';
import { AllLists } from './Containers/AllLists/AllLists'; // eslint-disable-line
import { SelectedList } from './Containers/SelectedList/SelectedList'; // eslint-disable-line
import './App.css';

const envUserId = process.env.REACT_APP_USER_ID; // Temporary

export const UserIdContext = createContext(null);
function App() {
  const [userId] = useState(envUserId); // if user id is empty, render login/register page
  return (
    <div className="App">
      <main className="main">
        <UserIdContext.Provider value={userId}>
          <AllLists />
          <SelectedList />
        </UserIdContext.Provider>
      </main>
      <footer />
    </div>
  );
}

export default App;
