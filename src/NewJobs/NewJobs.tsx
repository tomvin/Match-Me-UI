import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import './NewJobs.scss';
import { NewJob } from '../Models/NewJob';
import JobCard from './JobCard/JobCard';
import { useSnackbar } from 'notistack';

const mockJobs: NewJob[] = [{
  id: 1,
  companyName: 'RMIT',
  title: 'Lecturer',
  description: 'Teach students cool stuff! ',
  softSkills: ['10 years teaching experience', 'Microsoft Powerpoint', 'Blackboard', 'Smart'],
  degrees: ['Masters of Teaching'],
  competence: 5,
  category: 'School',
  datePosted: new Date(),
  salary: '$100,000'
}];

const SeekerJobSearch: React.FC<RouteComponentProps> = () => {
  // const [viewingJob, setViewingJob] = React.useState(0);
  const [jobs] = React.useState(mockJobs);
  // const numberOfJobs: number = jobs.length;
  const { enqueueSnackbar } = useSnackbar();

  function handleApply(jobId: number) {
    enqueueSnackbar(`You've just applied for job ${jobId}, this isn't implemented yet. `, { variant: 'info' });
  }

  function handleReject(jobId: number) {
    enqueueSnackbar(`You've just rejected job ${jobId}, this isn't implemented yet. `, { variant: 'warning' });
  }

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <p>NOTE: This is where job seekers will come to look at new potential job matches which the algorithm has found for them. </p>
          {
            jobs.map((job, i) => (
              <JobCard job={job} key={i} applyClick={handleApply} rejectClick={handleReject}></JobCard>
            ))
          }
        </Grid>
      </Grid>
  );
}

export default SeekerJobSearch;
