import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import BusinessIcon from '@material-ui/icons/Business';
import ButtonBase from '@material-ui/core/ButtonBase';
import { navigate } from "@reach/router";
import './Start.scss';

const Start: React.FC<RouteComponentProps> = () => {
  function handleJobSeekerClick() {
    navigate(`/seeker/search`);
  }

  function handleEmployerClick() {
    navigate(`/employer/home`);
  }

  return (
    <div className="container">
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <ButtonBase className="button" onClick={handleJobSeekerClick}>
            <Paper className="user">
              <FaceIcon className="user__icon" />
              <span className="user__type">Job Seeker</span>
            </Paper>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonBase className="button" onClick={handleEmployerClick}>
            <Paper className="user">
              <BusinessIcon className="user__icon" />
              <span className="user__type">Employer</span>
            </Paper>
          </ButtonBase>
        </Grid>
      </Grid>
    </div>
  );
}

export default Start;
