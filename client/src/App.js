import React from 'react';
import { AllLists } from './Containers/AllLists/AllLists';
import { SelectedList } from './Containers/SelectedList/SelectedList';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="main">
        <AllLists />
        <SelectedList />
      </main>
      <footer />
    </div>
  );
}

export default App;