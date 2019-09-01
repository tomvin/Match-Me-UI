import React, { useState } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import Navigation from '../Navigation/Navigation';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import PotentialJobs from '../PotentialJobsPage/PotentialJobsPage';
import MatchedJobs from '../MatchedJobsPage/MatchedJobsPage';
import PotentialJobDetailsPage from '../PotentialJobDetailsPage/PotentialJobDetailsPage';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import LoginPage from '../LoginPage/LoginPage';

library.add(far, fas);

// Setup apollo client for graphql queries, mutations, etc. 
const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
});

interface AppState {
  appName: string | undefined;
  user: { email: string } | undefined;
}

const App: React.FC = () => {
  const [appState]: [AppState, any] = useState({
    appName: process.env.REACT_APP_TITLE,
    user: undefined
  });

  return (
    <div className="app">
      <ApolloProvider client={client}>
        <BrowserRouter>
          {
            appState.user ? (
              <div>
                <Header appName={appState.appName} userName={appState.user.email}></Header>
                <Navigation></Navigation>
              </div>
            ) : <Redirect to="/login" />
          }
          <Switch>
            <Route path="/matched-jobs" component={MatchedJobs}></Route>
            <Route path="/potential-jobs/:jobId" component={PotentialJobDetailsPage}></Route>
            <Route path="/potential-jobs" component={PotentialJobs}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route exact path="/" render={() => (<Redirect to="/matched-jobs" />)}></Route>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
