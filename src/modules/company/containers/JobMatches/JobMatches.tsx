import React from 'react'
import './JobMatches.scss';
import { useQuery } from '@apollo/react-hooks';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import Loading from '../../../shared/components/Loading/Loading';
import List from '../../../shared/components/List/List';
import { JobCompleteMatchResult, JobCompleteMatchVariables, JOB_COMPLETE_MATCH_QUERY } from '../../../../api/queries/jobCompleteMatchesQuery';
import { IUser } from '../../../../models/User';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../redux/appState';
import Alert from '../../../shared/components/Alert/Alert';

interface Props {
  jobId: string;
}

const JobMatches = (props: Props) => {
  const user: IUser | null = useSelector((state: IAppState) => state.authentication.user);
  const { loading: loadingJobMatches, error: errorLoadingJobMatches, data: jobMatches } = useQuery<JobCompleteMatchResult, JobCompleteMatchVariables>(JOB_COMPLETE_MATCH_QUERY, { variables: { companyUserId: user ? user._id : '?' } });
  
  const buildMatchedUsersList = (jobMatches: JobCompleteMatchResult | undefined): ListItemVM[] => {
    if (!jobMatches || !jobMatches.jobCompleteMatches) {
      return [];
    }

    const job = jobMatches.jobCompleteMatches.find(job => job._id === props.jobId);
    if (!job || !job.completeJobSeekerMatch) {
      return [];
    }

    return job.completeJobSeekerMatch.map<ListItemVM>(user => ({
      type: 'icon',
      route: '',
      title: user.email,
      description: user.jobSeeker ? user.jobSeeker.phone : '',
      pillText: `$${user.jobSeeker ? user.jobSeeker.salary.toFixed(0) : '0'}`,
      pillVariant: 'green',
      variant: 'primary',
      icon: 'user'
    }));
  }

  if (loadingJobMatches) return <Loading />
  if (errorLoadingJobMatches) return <div>Error loading job matches. </div>

  const matchedUsersList: ListItemVM[] = buildMatchedUsersList(jobMatches)
  if (matchedUsersList.length === 0) {
    return (
      <Alert 
        variant="purple" 
        title={`No Matches`} 
        message={`Start looking at new candidates we found for you`} 
      />
    )
  }

  return <List items={matchedUsersList} />
}

export default JobMatches