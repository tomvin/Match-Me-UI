import React, { useState } from 'react';
import './App.scss';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import MatchedJobs from '../../../seeker/containers/MatchedJobsPage/MatchedJobsPage';
import { InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import LoginPage from '../../../auth/containers/LoginPage/LoginPage';
import { useSelector, useDispatch } from 'react-redux';
import { IUser } from '../../../../models/User';
import { IAppState, resetState } from '../../../../redux/appState';
import Navigation from '../Navigation/Navigation';
import PotentialJobsPage from '../../../seeker/containers/PotentialJobsPage/PotentialJobsPage';
import PotentialJobDetailsPage from '../../../seeker/containers/PotentialJobDetailsPage/PotentialJobDetailsPage';
import Header from '../../components/Header/Header';
import JobPostingsPage from '../../../company/containers/JobPostingsPage/JobPostingsPage';
import MatchedJobDetailsPage from '../../../seeker/containers/MatchedJobDetailsPage/MatchedJobDetailsPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import JobPostingDetailsPage from '../../../company/containers/JobPostingDetailsPage';
import CreateNewJob from '../../../company/containers/CreateNewJob';

library.add(far, fas);

// Setup apollo client for graphql queries, mutations, etc. 
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL
})

export const apolloClient = new ApolloClient({
  cache,
  link
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [appState] = useState({
    appName: process.env.REACT_APP_TITLE,
  });
  const user: IUser | null = useSelector((state: IAppState) => state.authentication.user);

  const handleLogout = () => {
    dispatch(resetState());
  }

  return (
    <div className="app">
        <ApolloProvider client={apolloClient}>
          <BrowserRouter>
            {
              user ? (
                <React.Fragment>
                  <Header 
                    appName={appState.appName} 
                    userEmail={user.email}
                    logoutFn={handleLogout}
                  />  
                  <Navigation />
                </React.Fragment>
              ) : ''
            }
            <Switch>
              <Route path="/matched-jobs/:jobId" component={MatchedJobDetailsPage}></Route>
              <Route path="/matched-jobs" component={MatchedJobs}></Route>
              <Route path="/potential-jobs/:jobId" component={PotentialJobDetailsPage}></Route>
              <Route path="/potential-jobs" component={PotentialJobsPage}></Route>
              <Route path="/login" component={LoginPage}></Route>
              <Route path="/company/jobs/:jobId" component={JobPostingDetailsPage}></Route>
              <Route path="/company/jobs" component={JobPostingsPage}></Route>
              <Route path="/company/new" component={CreateNewJob}></Route>
              <Route exact path="/" render={() => {
                if (user && user.isCompany) {
                  return (<Redirect to="/company/jobs" />)
                } else if (user && !user.isCompany) {
                  return (<Redirect to="/matched-jobs" />)
                } else {
                  return <Redirect to="/login" />
                }
              }}></Route>
              <Route path='*' exact={true} component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
    </div>
  );
}

export default App;
