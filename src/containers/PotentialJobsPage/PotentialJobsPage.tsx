import React, { useState } from 'react'
import { PotentialJobMatch } from '../../models/PotentialJobMatch';
import './PotentialJobsPage.scss';
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import { MOCK_POTENTIAL_JOBS } from '../../mock/PotentialJobs';
import MatchList from '../../components/MatchList/MatchList';
import { MatchListItemVM } from '../../components/MatchListItem/MatchListItemModels';

const PotentialJobsPage = () => {
  const initialState: PotentialJobsState = { potentialJobs: MOCK_POTENTIAL_JOBS };
  const [ potentialJobsState ]: [PotentialJobsState, any] = useState(initialState);
  
  const potentialJobsToMatchList = (jobs: PotentialJobMatch[]): MatchListItemVM[] => jobs.map(potentialJob => ({
    route: `/potential-jobs/${potentialJob.id}`,
    imageUrl: potentialJob.job.company.logoUrl,
    title: potentialJob.job.title,
    description: potentialJob.job.description,
    matchPercentage: potentialJob.matchPercentage
  }));

  return (
    <div className="potential-jobs">
      <div className="search-info">
        We have found {potentialJobsState.potentialJobs.length + 1} jobs you might be interested in!
      </div>
      <MatchList 
        items={potentialJobsToMatchList(potentialJobsState.potentialJobs)}
      />
    </div>
  )
}

export default pageWrapper(PotentialJobsPage)

interface PotentialJobsState {
  potentialJobs: PotentialJobMatch[]; 
}