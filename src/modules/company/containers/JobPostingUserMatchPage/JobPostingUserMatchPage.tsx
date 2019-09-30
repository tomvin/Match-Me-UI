import React from 'react'
import './JobPostingUserMatchPage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import { RouteComponentProps } from 'react-router-dom';
import UserDetails from '../../../shared/components/UserDetails/UserDetails';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_JOB_SEEKER_USERS_QUERY, AllJobSeekerUsersResult } from '../../../../api/queries/allJobSeekerUsersQuery';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { IUser } from '../../../../models/User';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import PageBackLink from '../../../shared/components/PageBackLink/PageBackLink';
import { ACCEPT_JOB_SEEKER, AcceptJobSeekerResult, AcceptJobSeekerVariables } from '../../../../api/mutations/acceptJobSeekerMutation';

interface Params {
  jobId: string;
  userId: string;
  m: 'm' | undefined; // will be true if this is a complete match
}

const JobPostingUserMatchPage = (props: RouteComponentProps<Params>) => {
  const { loading, error, data } = useQuery<AllJobSeekerUsersResult>(ALL_JOB_SEEKER_USERS_QUERY);
  const [ acceptJobSeeker, { loading: acceptJobSeekerLoading, data: acceptJobSeekerResult }] = useMutation<AcceptJobSeekerResult, AcceptJobSeekerVariables>(ACCEPT_JOB_SEEKER);
  const params = new URLSearchParams(props.location.search);

  const handleImInterestedClick = () => {
    const user: IUser | undefined = getUserFromQueryResult(data);

    if (!user) {
      return;
    }

    acceptJobSeeker({
      variables: {
        acceptInput: {
          userId: user._id,
          jobId: props.match.params.jobId
        }
      }
    });
  }

  const getUserFromQueryResult = (result: AllJobSeekerUsersResult | undefined): IUser | undefined => {
   if (!result || !result.users) {
     return undefined;
   } 

    return result.users.find(user => user._id === props.match.params.userId);
  }

  if (loading) return <Loading />
  if (error || !data || !data.users) return (
    <Error 
      errorDescription="There was a problem loading this job seeker" 
      route={`/company/jobs/${props.match.params.jobId}`}
    />
  )

  const user: IUser | undefined = getUserFromQueryResult(data);
  const routeBackToJobPage: string = `/company/jobs/${props.match.params.jobId}`;
  
  if (!user) {
    return (
      <Error 
        errorDescription="Could not find a job seeker with this ID" 
        route={routeBackToJobPage}
      />
    )
  }

  return (
    <div className="job-posting-user-match-page">
      <PageBackLink route={routeBackToJobPage} text="Back to Job" />
      <UserDetails user={user}></UserDetails>
      {
        // Only render the interested button if the route param "m"
        // isn't defined. If it is defined that means we are viewing this
        // as a matchd job.
        params.get('m') ? '' : (
          <Card className="job-seeker-response">
            <div className="job-seeker-response__text">
              Are you interested in meeting with this job seeker?
            </div>
            <div className="job-seeker-response__buttons">
              <Button 
                loading={acceptJobSeekerLoading} 
                disabled={(acceptJobSeekerLoading || acceptJobSeekerResult !== undefined)} 
                onClick={handleImInterestedClick} 
                className="interested-button" 
                icon="check" 
                variant="primary">
                  {acceptJobSeekerResult ? acceptJobSeekerResult.acceptJobSeeker : `I'm Interested` }
              </Button>
              <Button variant="secondary">I'm not interested</Button>
            </div>
          </Card>
        )
      }
    </div>
  )
}

export default pageWrapper(JobPostingUserMatchPage, { 
  authorisedUserTypes: [
    EUserType.Admin,
    EUserType.Company
  ]
})
