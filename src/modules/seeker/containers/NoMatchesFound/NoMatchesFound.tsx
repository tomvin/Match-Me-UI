import React from 'react'
import Alert from '../../../shared/components/Alert/Alert'
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import noJobsImg from '../../../../images/empty.svg';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import './NoMatchesFound.scss';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';
import { JOB_SEEKER_MATCH_COUNT_QUERY, JobSeekerMatchCountResult, JobSeekerMatchCountVariables } from '../../../../api/queries/jobSeekerMatchCountQuery';

const NoMatchesFound = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  const { loading, error, data } = useQuery<JobSeekerMatchCountResult, JobSeekerMatchCountVariables>(JOB_SEEKER_MATCH_COUNT_QUERY, { variables: { jobSeekerUserId: user._id } });

  if (loading) return <Loading />;
  if (error || !data) return <Error />;
  
  return (
    <div className="no-matches-found">
      <Alert 
        variant="purple" 
        title={`No Matches`} 
        message={`Start looking at the ${data.jobSeekerMatch ? data.jobSeekerMatch.length : 0} new jobs we found for you`} 
        route="/potential-jobs"
      />
      <img className="no-matches-found__image" src={noJobsImg} alt="Error" />
    </div>
  )
}

export default NoMatchesFound
