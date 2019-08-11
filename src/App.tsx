import React from 'react';
import './App.scss';
import { Router, Redirect } from '@reach/router';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SeekerJobSearch from './NewJobs/NewJobs';
import { NotFound } from './NotFound/NotFound';
import SideBar from './SideBar/SideBar';
import { MenuItem } from './Models/MenuItem';
import TopBar from './TopBar/TopBar';
import { SnackbarProvider } from 'notistack';
import { JobSeekerMatches } from './JobSeekerMatches/JobSeekerMatches';
import { JobSeekerProfile } from './JobSeekerProfle/JobSeekerProfile';

const App: React.FC = () => {
  const [menuItems] = React.useState(DEFAULT_MENU_ITEMS);

  return (
    <div className="app-root">
      <SideBar menuItems={menuItems}></SideBar>
      <main className="content">
        <TopBar menuItems={menuItems}></TopBar>
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <SnackbarProvider anchorOrigin={ {vertical: 'top', horizontal: 'center'} } maxSnack={3}>
                <Router>
                  <Redirect noThrow from="/" to="new-jobs" />
                  <SeekerJobSearch path="/new-jobs" />
                  <JobSeekerMatches path="/matches"></JobSeekerMatches>
                  <JobSeekerProfile path="profile"></JobSeekerProfile>
                  <NotFound default />
                </Router>
              </SnackbarProvider>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default App;

const DEFAULT_MENU_ITEMS: MenuItem[] = [{
  label: 'New Jobs',
  icon: 'search',
  route: '/new-jobs'
}, {
  label: 'Matches',
  icon: 'mood',
  route: '/matches'
}, {
  label: 'Profile',
  icon: 'person',
  route: '/profile'
}];