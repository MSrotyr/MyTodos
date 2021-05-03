import React from 'react';
// import { AllLists } from './Containers/AllLists/AllLists';
// import { SelectedList } from './Containers/SelectedList/SelectedList';

// import RegistrationForm from './Containers/RegistrationForm/RegistrationForm';
import LoginForm from './Containers/LoginForm/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="main">
        {/* <AllLists /> */}
        {/* <RegistrationForm /> */}
        {/* <SelectedList /> */}
        <LoginForm />
      </main>
      <footer />
    </div>
  );
}

export default App;
