import React from 'react'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import './MatchedJobsPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../../../../redux/appState';
import { IUser } from '../../../../models/User';
import { fetchJobSeekerMatchOverviews } from '../../../../redux/slices/jobSeekerMatchesSlice';
import NoMatchesFound from '../NoMatchesFound/NoMatchesFound';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import List from '../../../shared/components/List/List';
import { IJob } from '../../../../models/Job';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';

const MatchedJobsPage = () => {
  const dispatch = useDispatch();
  const { matches, loadingMatches, loadingFailed, loadingFailureMessage } = useSelector((state: IAppState) => state.jobSeekerMatches);
  const user: IUser | null = useSelector((state: IAppState) => state.authentication.user);
  dispatch(fetchJobSeekerMatchOverviews(user ? user._id : ''));

  const jobsToMatchList = (jobs: IJob[]): ListItemVM[] => jobs.map(job => ({
    route: ``,
    imageUrl: job.company.logoUrl,
    title: job.name,
    description: job.description,
    score: 1
  }));

  if (loadingMatches) return <Loading />;
  if (loadingFailed) return <Error errorDescription={loadingFailureMessage} />;
  if (!matches || matches.length === 0) return <NoMatchesFound />;
  
  return (
    <div className="matched-jobs-page">
      <div className="search-info">
        Woohoo! You have successfully matched with {matches.length} job!
      </div>
      <List items={jobsToMatchList(matches)} />
    </div>
  )
}

export default pageWrapper(MatchedJobsPage)
