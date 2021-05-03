import React, { useState, createContext } from 'react';
import { AllLists } from './Containers/AllLists/AllLists';
import { SelectedList } from './Containers/SelectedList/SelectedList';
import './App.css';

const UserIdContext = createContext(null);
function App() {
  const [userId, setUserId] = useState(''); // if user id is empty, render login/register page
  return (
    <div className="App">
      <main className="main">
        <UserIdContext.Provider value={{
          userId,
          setUserId: (id) => setUserId(id),
        }}
        >
          <AllLists />
          <SelectedList />
        </UserIdContext.Provider>
      </main>
      <footer />
    </div>
  );
}

export default App;
