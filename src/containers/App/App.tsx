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
import { useSelector, useDispatch } from 'react-redux';
import { IUser } from '../../models/User';
import { IAppState } from '../../redux/appState';
import { logout } from '../../redux/slices/authenticationSlice';

library.add(far, fas);

// Setup apollo client for graphql queries, mutations, etc. 
export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [appState] = useState({
    appName: process.env.REACT_APP_TITLE,
  });
  const user: IUser | null = useSelector((state: IAppState) => state.authentication.user);

  const handleLogout = () => {
    dispatch(logout());
  }

  console.log('Re-render', user);

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
