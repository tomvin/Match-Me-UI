import React from 'react'
import './UserDetails.scss';
import { IUser } from '../../../../models/User';
import Card from '../Card/Card';
import Error from '../Error/Error';
import IconList from '../IconList/IconList';
import { mapEducationToIconList } from '../../../../utils/MapEducationToIconList';
import { mapCompetenceToIconList } from '../../../../utils/MapCompetenceToIconList';
import { convertTypeOfWorkToString } from '../../../../utils/ConvertTypeOfWorkToString';

interface Props {
  user: IUser;
}

const UserDetails = (props: Props) => {
  if (!props.user.jobSeeker) return <Error errorDescription="This user is not a job seeker" />

  return (
    <Card className="user-details">
      <div className="user-details__left">
        <div className="user-details-logo">
          <img className="user-image" src={props.user.profilePictureUrl} alt="The potential job applicant" />
        </div>
      </div>
      <div className="user-details__right">
        <div className="user-details-header">
          <span className="user-details-header__name">{props.user.jobSeeker.name}</span>
        </div>
        <IconList className="user-details-list" title="Contact Details" items={[
          { icon: 'envelope', label: props.user.email }, 
          { icon: 'phone', label: props.user.jobSeeker.phone }
        ]} />
        <IconList className="user-details-list" title="Desired Salary" items={[{ icon: 'money-bill', label: `$${props.user.jobSeeker.salary.toLocaleString()}` }]}></IconList>
        <IconList className="user-details-list" title="Location" items={[{ icon: 'globe-asia', label: props.user.jobSeeker.location }]}></IconList>
        <IconList className="user-details-list" title="Desired Type of Work" items={[{ icon: 'dumbbell', label: convertTypeOfWorkToString(props.user.jobSeeker.typeofwork) }]}></IconList>
        <IconList className="user-details-list" title="Education" items={mapEducationToIconList(props.user.jobSeeker.education)}></IconList>
        <IconList className="user-details-list" title="Competence" items={mapCompetenceToIconList(props.user.jobSeeker.competence)}></IconList>
      </div>
    </Card>
  )
}

export default UserDetails
