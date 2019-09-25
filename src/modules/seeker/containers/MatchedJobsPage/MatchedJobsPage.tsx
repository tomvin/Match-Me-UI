import React from 'react'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import './MatchedJobsPage.scss';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../redux/appState';
import { IUser } from '../../../../models/User';
import NoMatchesFound from '../NoMatchesFound/NoMatchesFound';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import List from '../../../shared/components/List/List';
import { IJob } from '../../../../models/Job';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import { EUserType } from '../../../../models/UserType';
import { useQuery } from '@apollo/react-hooks';
import { JOB_SEEKER_COMPLETE_MATCHES_QUERY, JobSeekerCompleteMatchesResult, JobSeekerCompleteMatchesVariables } from '../../../../api/queries/jobSeekerCompleteMatchesQuery';

const MatchedJobsPage = () => {
  const user: IUser | null = useSelector((state: IAppState) => state.authentication.user);
  const { loading: loadingMatches, error: errorLoadingMatches, data: matches } = useQuery<JobSeekerCompleteMatchesResult, JobSeekerCompleteMatchesVariables>(
    JOB_SEEKER_COMPLETE_MATCHES_QUERY,
    {
      variables: {
        userId: user ? user._id : '-1'
      }
    });

  const jobsToListItems = (jobs: IJob[]): ListItemVM[] => jobs.map<ListItemVM>(job => ({
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
  if (!matches || !matches.JobSeekerCompleteMatches || matches.JobSeekerCompleteMatches.length === 0) return <NoMatchesFound />;
  
  return (
    <div className="matched-jobs-page">
      <div className="search-info">
        Woohoo! You have successfully matched with {matches.JobSeekerCompleteMatches.length} jobs!
      </div>
      <List items={jobsToListItems(matches.JobSeekerCompleteMatches)} />
    </div>
  )
}

export default pageWrapper(MatchedJobsPage, { authorisedUserTypes: [EUserType.JobSeeker] })
