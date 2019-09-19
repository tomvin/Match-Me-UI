import React from 'react'
import { IJobSeekerMatch } from '../../../../models/JobSeekerMatch';
import './PotentialJobsPage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import List from '../../../shared/components/List/List';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../redux/appState';
import { PillVariant } from '../../../shared/components/Pill/Pill';
import { EUserType } from '../../../../models/UserType';

const PotentialJobsPage = () => {  
  const userId = useSelector((state: IAppState) => state.authentication.user ? state.authentication.user._id : -1)

  const convertJobMatchScoreToPillVariant = (percentage: number): PillVariant => {
    if (percentage > .6) return 'green';
    else if (percentage > .3) return 'orange';
    else return 'red';
  };

  const potentialJobsToListItems = (jobs: IJobSeekerMatch[]): ListItemVM[] => jobs.sort((jobA, jobB) => jobB.score - jobA.score).map<ListItemVM>(potentialJob => ({
    type: 'image',
    route: `/potential-jobs/${potentialJob.job._id}`,
    imageUrl: potentialJob.job.company.logoUrl,
    title: potentialJob.job.name,
    description: potentialJob.job.description,
    pillText: `${potentialJob.score * 100}% match!`,
    pillVariant: convertJobMatchScoreToPillVariant(potentialJob.score),
    variant: 'primary'
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
      <List 
        items={potentialJobsToListItems(data.jobSeekerMatch)}
      />
    </div>
  )
}

export default pageWrapper(PotentialJobsPage, { authorisedUserTypes: [EUserType.JobSeeker] })
