import React, { useState } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';

const App: React.FC = () => {
  const [appState] = useState({
    appName: 'Match Me',
    userName: 'Mr Job Seeker'
  });

  return (
    <div className="app">
      <Header appName={appState.appName} userName={appState.userName}></Header>
      <Navigation></Navigation>
    </div>
  );
}

export default App;
