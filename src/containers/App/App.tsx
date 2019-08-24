import React, { useState } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import Navigation from '../Navigation/Navigation';
import { Route, Switch, Redirect } from 'react-router';
import PotentialJobs from '../PotentialJobs/PotentialJobs';
import MatchedJobs from '../MatchedJobs/MatchedJobs';

const App: React.FC = () => {
  const [appState] = useState({
    appName: 'Match Me',
    userName: 'Mr Job Seeker'
  });

  return (
    <div className="app">
      <Header appName={appState.appName} userName={appState.userName}></Header>
      <Navigation></Navigation>
      <Switch>
        <Route path="/matched-jobs" component={MatchedJobs}></Route>
        <Route path="/potential-jobs" component={PotentialJobs}></Route>
        <Route exact path="/" render={() => (<Redirect to="/matched-jobs" />)}></Route>
      </Switch>
    </div>
  );
}

export default App;
