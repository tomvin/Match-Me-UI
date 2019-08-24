import React, { Component } from 'react'
import './PotentialJobDetailsPage.scss';
import { RouteComponentProps, NavLink } from "react-router-dom";
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Job } from '../../models/Job';
import { MOCK_JOBS } from '../../mock/Jobs';
import JobDetails from '../../components/JobDetails/JobDetails';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';

interface Params {
  jobId: string;
}

interface State {
  job: Job | undefined;
  loading: boolean;
}

class PotentialJobDetailsPage extends Component<RouteComponentProps<Params>, State> {
  constructor(props: RouteComponentProps<Params>) {
    super(props);
    this.state = {
      job: undefined,
      loading: true
    };
  }

  componentDidMount() {
    const jobId: string = this.props.match.params.jobId;
    
    if (!jobId) {
      this.setState({
        job: undefined,
        loading: false
      });
      return;
    }

    this.loadJob(jobId);
  }

  loadJob(id: string) {
    const job = MOCK_JOBS.find(j => j._id === id);
    
    this.setState({
      job: job,
      loading: false
    });
  }
  
  render() {
    return (
      <div className="potential-job-details-page">
        <NavLink to="/potential-jobs" className="back-link">
          <FontAwesomeIcon className="back-link__icon" icon={['fas', 'chevron-left']} />
          <span className="back-link__text">Back to Results</span>
        </NavLink>
        { this.state.job ? <JobDetails job={this.state.job} /> : <div>Job not found. </div> }
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
}

export default pageWrapper(PotentialJobDetailsPage)