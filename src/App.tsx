import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [ appState, setAppState ] = useState({
    appName: 'Match Me',
    username: 'Tom Vinnicombe'
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>{appState.appName}</h1>
        <p>Hello.. welcome to our empty app.</p>
      </header>
    </div>
  );
}

export default App;
