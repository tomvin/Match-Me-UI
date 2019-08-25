import React from 'react'
import { JobSeekerMatch } from '../../models/JobSeekerMatch';
import './PotentialJobsPage.scss';
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import MatchList from '../../components/MatchList/MatchList';
import { MatchListItemVM } from '../../components/MatchListItem/MatchListItemModels';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const PotentialJobsPage = () => {  
  const potentialJobsToMatchList = (jobs: JobSeekerMatch[]): MatchListItemVM[] => jobs.map(potentialJob => ({
    route: `/potential-jobs/${potentialJob.job._id}`,
    imageUrl: potentialJob.job.company.logoUrl,
    title: potentialJob.job.name,
    description: potentialJob.job.description,
    score: potentialJob.score
  }));

  const { loading, error, data } = useQuery(gql`
  query JobSeekerMatch{
    jobSeekerMatch(id:"${process.env.REACT_APP_JOB_SEEKER_USER_ID}"){
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
  potentialJobs: JobSeekerMatch[]; 
}