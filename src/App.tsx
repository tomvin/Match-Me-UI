import React from 'react';
import './App.scss';
import { Router } from '@reach/router';
import Container from '@material-ui/core/Container';
import Start from './Start/Start';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import SeekerJobSearch from './SeekerJobSearch/SeekerJobSearch';
import { NotFound } from './NotFound/NotFound';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <CssBaseline />
      <main className="content">
        <Container className="container" maxWidth="lg">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Router>
                <Start path="/" />
                <SeekerJobSearch path="/seeker/search" />
                <NotFound default />
              </Router>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default App;
