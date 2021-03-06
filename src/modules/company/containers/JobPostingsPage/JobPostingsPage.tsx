import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper'
import { EUserType } from '../../../../models/UserType'
import List from '../../../shared/components/List/List'
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loading from '../../../shared/components/Loading/Loading'
import Error from '../../../shared/components/Error/Error'
import { useSelector } from 'react-redux'
import './JobPostingsPage.scss'
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors'
import { LoggedInUser } from '../../../../api/queries/checkUserQuery'
import { COMPANY_JOB_POSTINGS_QUERY, CompanyJobPostingsResult, CompanyJobPosting } from '../../../../api/queries/companyJobPostingsQuery';
import Button from '../../../shared/components/Button/Button'
import { DELETE_JOB, DeleteJobVariables, DeleteJobResult } from '../../../../api/mutations/deleteJobMutation'

const JobPostingsPage = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  const [ deletedJobIds, setDeletedJobIds ] = useState<string[]>([]);
  const [ deleteJob ] = useMutation<DeleteJobResult, DeleteJobVariables>(DELETE_JOB);
  const { loading, error, data } = useQuery<CompanyJobPostingsResult>(COMPANY_JOB_POSTINGS_QUERY, {
    fetchPolicy: 'network-only'
  });
  
  const filterOutJobsNotPartOfUsersCompany = (jobs: CompanyJobPosting[]) => jobs.filter(job => job.company._id === (user.company ? user.company._id : -99999));
  const filterOutDeletedJobs = (jobs: CompanyJobPosting[]): CompanyJobPosting[] => jobs.filter(job => !deletedJobIds.includes(job._id));

  const convertJobsToListItems = (jobs: CompanyJobPosting[]): ListItemVM[] => {
    return jobs.map<ListItemVM>(job => ({
      jobId: job._id,
      type: 'icon',
      icon: 'file-alt',
      route: `/company/jobs/${job._id}`,
      title: job.name,
      description: job.description,
      pillText: `${job.completeJobSeekerMatch.length} Matched Applicants`,
      pillVariant: 'green',
      variant: 'primary',
      deleteItem: () => {
        deleteJob({ variables: { jobId: job._id } });
        setDeletedJobIds([
          ...deletedJobIds,
          job._id
        ]);
      }
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
  const buildJobPostingsFromQueryResult = (data: CompanyJobPostingsResult | undefined): ListItemVM[] => {
    if (!data || !data.companyJobPostings) {
      return [];
    }

    return convertJobsToListItems(filterOutDeletedJobs(filterOutJobsNotPartOfUsersCompany(data.companyJobPostings)))
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="job-postings-page">
      <Link className="create-new-job" to="/company/jobs/new">
        <Button variant="primary" icon="plus">Create New Job</Button>
      </Link>
      <List items={buildJobPostingsFromQueryResult(data)}></List>
    </div>
  )
}

export default pageWrapper(JobPostingsPage, { authorisedUserTypes: [EUserType.Company] })