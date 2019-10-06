import React from 'react'
import './PotentialJobsPage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import List from '../../../shared/components/List/List';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { useSelector } from 'react-redux';
import { EUserType } from '../../../../models/UserType';
import { convertMatchScoreToPillVariant } from '../../../../utils/ConvertMatchScoreToPillVariant';
import { JOB_SEEKER_MATCH_QUERY, JobSeekerMatchResult, JobSeekerMatch } from '../../../../api/queries/jobSeekerMatchQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { JobSeekerMatchCountVariables } from '../../../../api/queries/jobSeekerMatchCountQuery';

const PotentialJobsPage = () => {  
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  const { loading, error, data } = useQuery<JobSeekerMatchResult, JobSeekerMatchCountVariables>(JOB_SEEKER_MATCH_QUERY, { 
    variables: { 
      jobSeekerUserId: user._id 
    },
    fetchPolicy: 'network-only'
  });

  const potentialJobsToListItems = (matches: JobSeekerMatch[]): ListItemVM[] => matches.sort((jobA, jobB) => jobB.score - jobA.score).map<ListItemVM>(potentialJob => ({
    jobId: potentialJob.job._id,
    type: 'image',
    route: `/potential-jobs/${potentialJob.job._id}`,
    imageUrl: potentialJob.job.company.logoUrl,
    title: potentialJob.job.name,
    description: potentialJob.job.description,
    pillText: `${(potentialJob.score * 100).toFixed(0)}% match!`,
    pillVariant: convertMatchScoreToPillVariant(potentialJob.score),
    variant: 'primary'
  }));

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <div className="potential-jobs">
      <div className="search-info">
        We have found {data.jobSeekerMatch ? data.jobSeekerMatch.length : 0} jobs you might be interested in!
      </div>
      <List 
        items={potentialJobsToListItems(data.jobSeekerMatch ? data.jobSeekerMatch : [])}
      />
    </div>
  )
}

export default pageWrapper(PotentialJobsPage, { authorisedUserTypes: [EUserType.JobSeeker] })
