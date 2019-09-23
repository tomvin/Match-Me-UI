import React from 'react'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper'
import { EUserType } from '../../../../models/UserType'
import List from '../../../shared/components/List/List'
import { IJob } from '../../../../models/Job'
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loading from '../../../shared/components/Loading/Loading'
import Error from '../../../shared/components/Error/Error'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../../redux/slices/authenticationSlice'
import { IUser } from '../../../../models/User'

const JobPostingsPage = () => {
  const user: IUser = useSelector(userSelector);

  const filterOutJobsNotPartOfUsersCompany = (jobs: IJob[]) => jobs.filter(job => job.company._id === (user.company ? user.company._id : -99999));

  const convertJobsToListItems = (jobs: IJob[]): ListItemVM[] => {
    return jobs.map<ListItemVM>(job => ({
      type: 'icon',
      icon: 'file-alt',
      route: `/company/jobs/${job._id}`,
      title: job.name,
      description: job.description,
      pillText: `${job.completeJobSeekerMatch.length} Matched Applicants`,
      pillVariant: 'green',
      variant: 'primary'
    }));
  }

  /**
   * Takes a collection of all jobs in the db and will filter out
   * the jobs which aren't part of the logged in users company. 
   * 
   * Will then convert the remaining jobs into the correct structure
   * to pass to the <List> component.
   * @param jobs Jobs to filter and pass to the job listing <List> component.
   */
  const buildJobPostings = (jobs: IJob[]) => convertJobsToListItems(filterOutJobsNotPartOfUsersCompany(jobs));

  /**
   * Currently to get a list of relevant jobs I have to query for
   * all jobs in the whole db. 
   */
  const { loading, error, data } = useQuery(gql`
    query CompanyJobPostings {
      jobs{
        _id
        name
        description
        company{
          _id
        }
        jobSeekerInterest{
          _id
        }
        completeJobSeekerMatch{
          _id
        }
      }
    }
  `);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <List items={buildJobPostings(data.jobs)}></List>
    </div>
  )
}

export default pageWrapper(JobPostingsPage, { authorisedUserTypes: [EUserType.Company] })