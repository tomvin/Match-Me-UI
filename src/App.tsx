import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

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
        <Button variant="outlined">Test</Button>
      </header>
    </div>
  );
}

export default App;
