import React from 'react'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import './MatchedJobsPage.scss';
import { useSelector } from 'react-redux';
import NoMatchesFound from '../NoMatchesFound/NoMatchesFound';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import List from '../../../shared/components/List/List';
import { IJob } from '../../../../models/Job';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import { EUserType } from '../../../../models/UserType';
import { useQuery } from '@apollo/react-hooks';
import { JOB_SEEKER_MATCH_OVERVIEWS_QUERY, JobSeekerMatchOverviewsResult, JobSeekerMatchOverviewsVariables } from '../../../../api/queries/jobSeekerCompleteMatchesQuery';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';

const MatchedJobsPage = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  const { loading: loadingMatches, error: errorLoadingMatches, data: matches } = useQuery<JobSeekerMatchOverviewsResult, JobSeekerMatchOverviewsVariables>(
    JOB_SEEKER_MATCH_OVERVIEWS_QUERY,
    {
      variables: {
        userId: user ? user._id : '-1'
      },
      fetchPolicy: 'network-only'
    });

  const jobsToListItems = (jobs: IJob[]): ListItemVM[] => jobs.map<ListItemVM>(job => ({
    jobId: job._id,
    type: 'image',
    route: `/matched-jobs/${job._id}`,
    imageUrl: job.company.logoUrl,
    title: job.name,
    description: job.description,
    pillText: 'Matched!',
    pillVariant: 'green',
    variant: 'primary'
  }));

  if (loadingMatches) return <Loading />;
  if (errorLoadingMatches) return <Error errorDescription="Failed to load matched jobs" />;
  if (!matches || !matches.JobSeekerMatchOverviews || matches.JobSeekerMatchOverviews.length === 0) return <NoMatchesFound />;
  
  return (
    <div className="matched-jobs-page">
      <div className="search-info">
        Woohoo! You have successfully matched with {matches.JobSeekerMatchOverviews.length} jobs!
      </div>
      <List items={jobsToListItems(matches.JobSeekerMatchOverviews)} />
    </div>
  )
}

export default pageWrapper(MatchedJobsPage, { authorisedUserTypes: [EUserType.JobSeeker] })
