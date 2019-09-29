import React from 'react'
import './PotentialJobDetailsPage.scss';
import { RouteComponentProps, NavLink } from "react-router-dom";
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { IJob } from '../../../../models/Job';
import emptyImg from '../../../../images/empty.svg';
import Alert from '../../../shared/components/Alert/Alert';
import { EUserType } from '../../../../models/UserType';
import { JOB_DETAILS_FRAGMENT } from '../../../../api/fragments/jobDetailsFragment';
import { ACCEPT_JOB, AcceptJobResult, AcceptJobVariables } from '../../../../api/mutations/acceptJobMutation';
import { IAppState } from '../../../../redux/appState';
import { useSelector } from 'react-redux';
import { IUser } from '../../../../models/User';
import JobDetails from '../../../shared/components/JobDetails/JobDetails';

const GET_JOBS = gql`
  query Jobs {
    jobs{
      ...JobDetails
    }
  }
  ${JOB_DETAILS_FRAGMENT}
`;



interface Params {
  jobId: string;
}

const PotentialJobDetailsPage = (props: RouteComponentProps<Params>) => {
  const [acceptJob, { loading: acceptJobLoading, data: acceptJobResult }] = useMutation<AcceptJobResult, AcceptJobVariables>(ACCEPT_JOB);
  const { loading, error, data } = useQuery(GET_JOBS);
  const user: IUser | null = useSelector((state: IAppState) => state.authentication.user); 

  if (!user) {
    return <Error route="/login" />;
  }

  const getJobFromQueryResult = (jobs: IJob[]): IJob | undefined => {
    if (!jobs) {
      return undefined;
    }

    return jobs.find(job => job._id === props.match.params.jobId);
  }

  const handleImInterestedClick = () => {
    const job: IJob | undefined = getJobFromQueryResult(data.jobs);

    if (!job) {
      return;
    }

    acceptJob({
      variables: {
        acceptInput: {
          userId: user._id,
          jobId: job._id
        }
      }
    });
  }

  if (loading) return <Loading />;
  if (error) return <Error route="/potential-jobs" />;

  const job: IJob | undefined = getJobFromQueryResult(data.jobs);

  if (!job) {
    return (
      <div className="potential-job-details-page--not-found">
        <Alert variant="red" title="Not Found" route="/potential-jobs" message="We can't seem to find the job you are looking for. Click to find other jobs. " />
        <img className="image" src={emptyImg} alt="Job not found. " />
      </div>
    )
  }

  return (
    <div className="potential-job-details-page">
      <NavLink to="/potential-jobs" className="back-link">
        <FontAwesomeIcon className="back-link__icon" icon={['fas', 'chevron-left']} />
        <span className="back-link__text">Back to Results</span>
      </NavLink>
      <JobDetails job={job} />
      <Card className="job-response">
        <div className="job-response__text">
          Are you interested in meeting with this employer about this job?
        </div>
        <div className="job-response__buttons">
          <Button 
            loading={acceptJobLoading} 
            disabled={(acceptJobLoading || acceptJobResult !== undefined)} 
            onClick={handleImInterestedClick} 
            className="interested-button" 
            icon="check" 
            variant="primary">
              {acceptJobResult ? acceptJobResult.acceptJob : `I'm Interested` }
          </Button>
          <Button variant="secondary">I'm not interested</Button>
        </div>
      </Card>
    </div>
  )
}

export default pageWrapper(PotentialJobDetailsPage, { authorisedUserTypes: [EUserType.JobSeeker] })