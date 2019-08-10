import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { navigate } from "@reach/router";
import './SeekerJobSearch.scss';

const SeekerJobSearch: React.FC<RouteComponentProps> = () => {

  return (
    <div className="container">
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          Find a job..
        </Grid>
      </Grid>
    </div>
  );
}

export default SeekerJobSearch;
