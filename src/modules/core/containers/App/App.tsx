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
import RegisterPage from '../../../auth/containers/RegisterPage/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../../../../redux/appState';
import Navigation from '../Navigation/Navigation';
import PotentialJobsPage from '../../../seeker/containers/PotentialJobsPage/PotentialJobsPage';
import PotentialJobDetailsPage from '../../../seeker/containers/PotentialJobDetailsPage/PotentialJobDetailsPage';
import Header from '../../components/Header/Header';
import JobPostingsPage from '../../../company/containers/JobPostingsPage/JobPostingsPage';
import MatchedJobDetailsPage from '../../../seeker/containers/MatchedJobDetailsPage/MatchedJobDetailsPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import JobPostingDetailsPage from '../../../company/containers/JobPostingDetailsPage/JobPostingDetailsPage';
import JobPostingUserMatchPage from '../../../company/containers/JobPostingUserMatchPage/JobPostingUserMatchPage';
import ProfilePage from '../../../seeker/containers/ProfilePage/ProfilePage';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';
import CreateNewJob from '../../../company/containers/CreateNewJobPage/CreateNewJobPage';
import CompanyProfilePage from '../../../company/containers/CompanyProfilePage/CompanyProfilePage';
import JobsPage from '../../../admin/containers/JobsPage/JobsPage';
import UsersPage from '../../../admin/containers/UsersPage/UsersPage';
import CompaniesPage from '../../../admin/containers/CompaniesPage/CompaniesPage';
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
  const user: LoggedInUser = useSelector(loggedInUserSelector);

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
              <Route path="/profile" component={ProfilePage}></Route>
              <Route path="/matched-jobs/:jobId" component={MatchedJobDetailsPage}></Route>
              <Route path="/matched-jobs" component={MatchedJobs}></Route>
              <Route path="/potential-jobs/:jobId" component={PotentialJobDetailsPage}></Route>
              <Route path="/potential-jobs" component={PotentialJobsPage}></Route>
              <Route path="/login" component={LoginPage}></Route>
              <Route path="/company/jobs/:jobId/match/:userId" component={JobPostingUserMatchPage}></Route>
              <Route path="/register" component={RegisterPage}></Route>
              <Route path="/company/profile" component={CompanyProfilePage}></Route>
              <Route path="/company/jobs/new" component={CreateNewJob}></Route>
              <Route path="/company/jobs/:jobId" component={JobPostingDetailsPage}></Route>
              <Route path="/company/jobs" component={JobPostingsPage}></Route>
              <Route path="/admin/jobs" component={JobsPage}></Route>
              <Route path="/admin/users" component={UsersPage}></Route>
              <Route path="/admin/companies" component={CompaniesPage}></Route>
              <Route exact path="/" render={() => {
                if (user && user.isCompany) {
                  return (<Redirect to="/company/jobs" />)
                } else if (user && user.isAdmin) {
                  return (<Redirect to="/admin/users" />)
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
