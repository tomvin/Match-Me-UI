import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [ appState ] = useState({
    appName: 'Match Me',
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>{appState.appName}</h1>
        <p>Hello.. welcome to our empty app.</p>
        <p>Hopefully heroku is working. </p>
      </header>
    </div>
  );
}

export default App;
