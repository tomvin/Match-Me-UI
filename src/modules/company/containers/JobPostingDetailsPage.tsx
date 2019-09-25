import React from 'react'
import { MOCK_USERS } from '../../../mock/Users';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../models/UserType';
import { RouteComponentProps } from 'react-router-dom';
import JobDetails from '../../seeker/components/JobDetails/JobDetails';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { IJob } from '../../../models/Job';
import Loading from '../../shared/components/Loading/Loading';
import Alert from '../../shared/components/Alert/Alert';
import Error from '../../shared/components/Error/Error';
import PageBackLink from '../../shared/components/PageBackLink/PageBackLink';
import List from '../../shared/components/List/List';
import { ListItemVM } from '../../shared/components/ListItem/ListItemModels';
import { IUser } from '../../../models/User';
import { JOB_DETAILS_FRAGMENT } from '../../../api/fragments/jobDetailsFragment';

interface Params {
  jobId: string;
}

const JobPostingDetailsPage = (props: RouteComponentProps<Params>) => {
  const getJobFromQueryResult = (jobs: IJob[]): IJob | undefined => {
    if (!jobs) {
      return undefined;
    }

    return jobs.find(job => job._id === props.match.params.jobId);
  }

  const { loading, error, data } = useQuery(gql`
    query JobPostings {
      jobs {
        ...JobDetails
      }
    }
    ${JOB_DETAILS_FRAGMENT}
  `);

  const buildMatchedUsersList = (users: IUser[]): ListItemVM[] => {
    if (!users) {
      return [];
    }

    return users.map<ListItemVM>(user => ({
      type: 'icon',
      route: '',
      title: user.email,
      description: 'This user is a great match!',
      pillText: 'Matched!',
      pillVariant: 'green',
      variant: 'primary',
      icon: 'handshake'
    }));
  }

  const buildPotentialMatchUsersList = (users: IUser[]): ListItemVM[] => {
    if (!users) {
      return [];
    }

    return users.map<ListItemVM>(user => ({
      type: 'icon',
      route: '',
      title: user.email,
      description: 'This user is a great match!',
      pillText: '100% Match',
      pillVariant: 'green',
      variant: 'primary',
      icon: 'user'
    }));
  }

  if (loading) return <Loading />;
  if (error) return <Error route="/company/jobs" />;

  const job: IJob | undefined = getJobFromQueryResult(data.jobs);

  if (!job) {
    return (
      <div className="potential-job-details-page--not-found">
        <Alert variant="red" title="Not Found" route="/potential-jobs" message="We can't seem to find the job you are looking for. Click to find other jobs. " />
      </div>
    )
  }

  return (
    <div className="job-posting-details-page">
      <PageBackLink
        route="/company/jobs"
        text="Back to Job Postings"
      ></PageBackLink>
      <JobDetails job={job} />
      <h3>Job Matches</h3>
      <p>You have {MOCK_USERS.length} matches for this job!</p>
      <List items={buildMatchedUsersList(MOCK_USERS)}></List>
      <h3>Potential Jobs (Found with our awesome algorithm)</h3>
      <p>You have {MOCK_USERS.length} good looking candidates which you might like to  for this job!</p>
      <List items={buildPotentialMatchUsersList(MOCK_USERS)}></List>
    </div>
  )
}

export default pageWrapper(JobPostingDetailsPage, { authorisedUserTypes: [EUserType.Company] })
