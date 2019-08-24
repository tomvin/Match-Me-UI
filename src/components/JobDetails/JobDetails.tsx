import React from 'react'
import './JobDetails.scss';
import { Job } from '../../models/Job';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../Card/Card';

interface Props {
  job: Job;
}

const JobDetails = (props: Props) => {
  return (
    <Card className="job-details">
      <div className="job-details__left">
        <img className="job-details__logo" src={props.job.company.logoUrl} alt={props.job.company.name} />
      </div>
      <div className="job-details__right">
        <div className="details-header">
          <div className="job-title">
            <span className="job-name">{props.job.name}</span>
            <span className="company-name">{props.job.company.name}</span>
          </div>
          <div className="education-container">
            {
              props.job.education.map((education, i) => (
                <div key={i} className="education">
                  <FontAwesomeIcon className="education__icon" icon={['fas', 'graduation-cap']} />
                  <span className="education__field">{`${education.level} in ${education.field}`}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="details-body">
          {props.job.description}
        </div>
      </div>
    </Card>
  )
}

export default JobDetails
