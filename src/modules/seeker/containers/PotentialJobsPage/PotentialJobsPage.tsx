import React from 'react'
import { IJobSeekerMatch } from '../../../../models/JobSeekerMatch';
import './PotentialJobsPage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import MatchList from '../../../shared/components/MatchList/MatchList';
import { MatchListItemVM } from '../../../shared/components/MatchListItem/MatchListItemModels';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../redux/appState';

const PotentialJobsPage = () => {  
  const userId = useSelector((state: IAppState) => state.authentication.user ? state.authentication.user._id : -1)
  const potentialJobsToMatchList = (jobs: IJobSeekerMatch[]): MatchListItemVM[] => jobs.map(potentialJob => ({
    route: `/potential-jobs/${potentialJob.job._id}`,
    imageUrl: potentialJob.job.company.logoUrl,
    title: potentialJob.job.name,
    description: potentialJob.job.description,
    score: potentialJob.score
  }));

  const { loading, error, data } = useQuery(gql`
  query JobSeekerMatch{
    jobSeekerMatch(id:"${userId}"){
      score
      job{
         _id
        name
        description
        company{
          _id
          name
          logoUrl
        }
      }
    }
  }
  `);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="potential-jobs">
      <div className="search-info">
        We have found {data.jobSeekerMatch.length} jobs you might be interested in!
      </div>
      <MatchList 
        items={potentialJobsToMatchList(data.jobSeekerMatch)}
      />
    </div>
  )
}

export default pageWrapper(PotentialJobsPage)

interface PotentialJobsState {
  potentialJobs: IJobSeekerMatch[]; 
}