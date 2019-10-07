import React from 'react';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { IJob } from '../../../../models/Job';
import Loading from '../../../shared/components/Loading/Loading';
import Alert from '../../../shared/components/Alert/Alert';
import Error from '../../../shared/components/Error/Error';
import PageBackLink from '../../../shared/components/PageBackLink/PageBackLink';
import { ALL_JOB_DETAILS_QUERY, AllJobDetailsResult } from '../../../../api/queries/allJobsDetailsQuery';
import JobPotentialMatches from '../JobPotentialMatches/JobPotentialMatches';
import TabGroup from '../../../shared/components/TabGroup/TabGroup';
import Tab from '../../../shared/components/Tab/Tab';
import JobMatches from '../JobMatches/JobMatches';
import './JobPostingDetailsPage.scss';
import JobDetails from '../../../shared/components/JobDetails/JobDetails';

interface Params {
  jobId: string;
}

const JobPostingDetailsPage = (props: RouteComponentProps<Params>) => {
  const { loading: allJobDetailsLoading, error: errorLoadingAllJobDetails, data: allJobDetails } = useQuery<AllJobDetailsResult>(ALL_JOB_DETAILS_QUERY);

  const getJobFromQueryResult = (result: AllJobDetailsResult | undefined): IJob | undefined => {
    if (!result || !result.allJobDetails) {
      return undefined;
    }

    return result.allJobDetails.find(job => job._id === props.match.params.jobId);
  }

  if (allJobDetailsLoading) return <Loading />;
  if (errorLoadingAllJobDetails) return <Error route="/company/jobs" />;

  const job: IJob | undefined = getJobFromQueryResult(allJobDetails);

  if (!job) {
    return (
      <div className="potential-job-details-page--not-found">
        <Alert variant="red" title="Not Found" route="/potential-jobs" message="We can't seem to find the job you are looking for. Click to find other jobs. " />
      </div>
    )
  }

  return (
    <div className="job-posting-details-page">
      <PageBackLink
        route="/company/jobs"
        text="Back to Job Postings"
      ></PageBackLink>
      <JobDetails job={job} />
      <TabGroup className="job-posting-details-page__tabs">
        <Tab 
          label="Matched Applicants" 
          description="View job seekers which you have a 2 way match with"
        >
          <JobMatches jobId={props.match.params.jobId} />
        </Tab>
        <Tab 
          label="Find More Matches" 
          description="Search for more candidates to match with"
        >
          <JobPotentialMatches jobId={props.match.params.jobId} />
        </Tab>
      </TabGroup>
    </div>
  )
}

export default pageWrapper(JobPostingDetailsPage, { authorisedUserTypes: [EUserType.Company] })
