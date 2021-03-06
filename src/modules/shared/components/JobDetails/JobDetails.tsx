import React from 'react'
import './JobDetails.scss';
import { IJob } from '../../../../models/Job';
import Card from '../../../shared/components/Card/Card';
import IconList from '../../../shared/components/IconList/IconList';
import { mapEducationToIconList } from '../../../../utils/MapEducationToIconList';
import { mapCompetenceToIconList } from '../../../../utils/MapCompetenceToIconList';

interface Props {
  job: IJob;
}

const JobDetails = (props: Props) => {
  return (
    <Card className="job-details">
      <div className="job-details__left">
        <img className="job-details__logo" src={props.job.company.logoUrl} alt={props.job.company.name} />
      </div>
      <div className="job-details__middle">
        <div className="details-header">
          <div className="job-title">
            <span className="job-name">{props.job.name}</span>
            <span className="company-name">{props.job.company.name}</span>
          </div>
        </div>
        <div className="details-body">
          {props.job.description}
        </div>
      </div>
      <div className="job-details__right">
        <IconList className="job-details-list" title="Salary" items={[{ icon: 'money-bill', label: `$${props.job.salary.toLocaleString()}` }]}></IconList>
        <IconList className="job-details-list" title="Education" items={mapEducationToIconList(props.job.education)}></IconList>
        <IconList className="job-details-list" title="Competence" items={mapCompetenceToIconList(props.job.competence)}></IconList>
        <IconList className="job-details-list" title="Location" items={[{ icon: 'globe-asia', label: props.job.location }]}></IconList>
      </div>
    </Card>
  )
}

export default JobDetails
