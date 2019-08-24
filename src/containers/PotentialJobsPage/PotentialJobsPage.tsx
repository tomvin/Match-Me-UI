import React, { useState } from 'react'
import { JobSeekerMatch } from '../../models/JobSeekerMatch';
import './PotentialJobsPage.scss';
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import { MOCK_POTENTIAL_JOBS } from '../../mock/PotentialJobs';
import MatchList from '../../components/MatchList/MatchList';
import { MatchListItemVM } from '../../components/MatchListItem/MatchListItemModels';

const PotentialJobsPage = () => {
  const initialState: PotentialJobsState = { potentialJobs: MOCK_POTENTIAL_JOBS };
  const [ potentialJobsState ]: [PotentialJobsState, any] = useState(initialState);
  
  const potentialJobsToMatchList = (jobs: JobSeekerMatch[]): MatchListItemVM[] => jobs.map(potentialJob => ({
    route: `/potential-jobs/${potentialJob.job._id}`,
    imageUrl: potentialJob.job.company.logoUrl,
    title: potentialJob.job.name,
    description: potentialJob.job.description,
    score: potentialJob.score
  }));

  return (
    <div className="potential-jobs">
      <div className="search-info">
        We have found {potentialJobsState.potentialJobs.length} jobs you might be interested in!
      </div>
      <MatchList 
        items={potentialJobsToMatchList(potentialJobsState.potentialJobs)}
      />
    </div>
  )
}

export default pageWrapper(PotentialJobsPage)

interface PotentialJobsState {
  potentialJobs: JobSeekerMatch[]; 
}