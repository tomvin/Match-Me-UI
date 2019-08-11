import React from 'react';
import { NewJob } from '../../Models/NewJob';
import { Card, CardHeader, CardActions, Button } from '@material-ui/core';
import './JobCard.scss';

export type JobCardProps = {
  job: NewJob;
  applyClick: any;
  rejectClick: any;
}

const JobCard = ({ job, applyClick, rejectClick }: JobCardProps) => {
  function handleApply() {
    applyClick(job.id);
  }

  function handleReject() {
    rejectClick(job.id);
  }

  return (
    <Card>
      <CardHeader 
        title={<h1 className="job-card--title">{ job.title } - { job.salary }</h1>} 
        subheader={<span className="job-card--date">{ job.datePosted.toString() }</span>} 
        avatar={(<div className="job-card-avatar">{ job.companyName }</div>)}
      />
      <div className="job-card__content">
        <h4 className="job-content__title">Category</h4>
        <p className="job-content__description">{ job.category }</p>
        <h4 className="job-content__title">Description</h4>
        <p className="job-content__description">{ job.description }</p>
        <h4 className="job-content__title">Degrees</h4>
        <ul className="job-skills-list">
          {
            job.degrees.map((degree, i) => (
              <li className="job-skill" key={i}>{ degree }</li>
            ))
          }
        </ul>
        <h4 className="job-content__title">Soft Skills</h4>
        <ul className="job-skills-list">
          {
            job.softSkills.map((skill, i) => (
              <li className="job-skill" key={i}>{ skill }</li>
            ))
          }
        </ul>
      </div>
      <CardActions className="job-card__actions">
        <Button onClick={handleApply} variant="outlined" color="primary">Apply for Job</Button>
        <Button onClick={handleReject} color="primary">Reject Job</Button>
      </CardActions>
    </Card>
  )
}

export default JobCard;