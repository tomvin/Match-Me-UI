import './MatchedJobDetailsPage.scss';
import React from 'react';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { IJob } from '../../../../models/Job';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import Alert from '../../../shared/components/Alert/Alert';
import emptyImg from '../../../../images/empty.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobDetails from '../../components/JobDetails/JobDetails';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import { MATCHED_JOB_DETAILS_QUERY, MatchedJobDetailsResult } from '../../../../api/queries/matchedJobDetailsQuery';

interface Params {
  jobId: string;
}

const MatchedJobDetailsPage = (props: RouteComponentProps<Params>) => {
    const getJobFromQueryResult = (data: MatchedJobDetailsResult | undefined): IJob | undefined => {
      if (!data || !data.matchedJobDetails) {
        return undefined;
      }
  
      return data.matchedJobDetails.find(job => job._id === props.match.params.jobId);
    }
  
    const { loading, error, data } = useQuery<MatchedJobDetailsResult>(MATCHED_JOB_DETAILS_QUERY);
  
    if (loading) return <Loading />;
    if (error) return <Error route="/" />;
  
    const job: IJob | undefined = getJobFromQueryResult(data);
  
    if (!job) {
      return (
        <div className="matched-job-details-page--not-found">
          <Alert variant="red" title="Not Found" route="/potential-jobs" message="We can't seem to find the job you are looking for. Click to find other jobs. " />
          <img className="image" src={emptyImg} alt="Job not found. " />
        </div>
      )
    }
  
    return (
      <div className="matched-job-details-page">
        <NavLink to="/" className="back-link">
          <FontAwesomeIcon className="back-link__icon" icon={['fas', 'chevron-left']} />
          <span className="back-link__text">Back to Matches</span>
        </NavLink>
        <JobDetails job={job} />
      </div>
    )
  }
  
  export default pageWrapper(MatchedJobDetailsPage, { authorisedUserTypes: [EUserType.JobSeeker] })