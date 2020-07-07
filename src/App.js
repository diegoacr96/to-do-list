import React from 'react';
import Main from './components/main';
import './styles/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          To Do List
        </h2>
      </header>
      <Main className="App-content" />
    </div>
  );
}

export default App;
