import React from 'react'
import './PotentialJobDetailsPage.scss';
import { RouteComponentProps, NavLink } from "react-router-dom";
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JobDetails from '../../components/JobDetails/JobDetails';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { IJob } from '../../../../models/Job';
import emptyImg from '../../../../images/empty.svg';
import Alert from '../../../shared/components/Alert/Alert';

interface Params {
  jobId: string;
}

const PotentialJobDetailsPage = (props: RouteComponentProps<Params>) => {
  const getJobFromQueryResult = (jobs: IJob[]): IJob | undefined => {
    if (!jobs) {
      return undefined;
    }

    return jobs.find(job => job._id === props.match.params.jobId);
  }

  const { loading, error, data } = useQuery(gql`
  query Jobs {
    jobs{
      _id
      name
      description
      company{
        _id
        name
        logoUrl
      }
      education{
        _id
        field
        level
      }
    }
  }
  `);

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
          <Button className="interested-button" icon="check" variant="primary">I'm Interested</Button>
          <Button variant="secondary">I'm not interested</Button>
        </div>
      </Card>
    </div>
  )
}

export default pageWrapper(PotentialJobDetailsPage)