import React, { Component } from 'react'
import './PotentialJobDetailsPage.scss';
import { RouteComponentProps } from "react-router-dom";
import { PotentialJobMatch } from '../../models/PotentialJobMatch';
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import { MOCK_POTENTIAL_JOBS } from '../../mock/PotentialJobs';

interface Params {
  potentialJobId: string;
}

interface State {
  potentialJob: PotentialJobMatch | undefined;
  loadingJobDetails: boolean;
}

class PotentialJobDetailsPage extends Component<RouteComponentProps<Params>, State> {
  constructor(props: RouteComponentProps<Params>) {
    super(props);
    this.state = {
      potentialJob: undefined,
      loadingJobDetails: true
    };
  }

  componentDidMount() {
    const potentialJobId: number = parseInt(this.props.match.params.potentialJobId);
    
    if (!potentialJobId) {
      this.setState({
        potentialJob: undefined,
        loadingJobDetails: false
      });
      return;
    }

    this.loadPotentialJob(potentialJobId);
  }

  loadPotentialJob(id: number) {
    const job = MOCK_POTENTIAL_JOBS.find(j => j.id === id);
    
    this.setState({
      potentialJob: job,
      loadingJobDetails: false
    });
  }
  
  render() {
    return (
      <div>
        { this.state.potentialJob ? this.state.potentialJob.job.title : '?' }
      </div>
    )
  }
}

export default pageWrapper(PotentialJobDetailsPage)