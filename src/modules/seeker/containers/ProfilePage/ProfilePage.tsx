import React from 'react'
import './ProfilePage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import JobSeekerProfileForm, { JobSeekerProfile } from '../../../shared/components/JobSeekerProfileForm/JobSeekerProfileForm';

const ProfilePage = () => {

  const handleJobSeekerFormChange = (profile: JobSeekerProfile): void => {
    console.log(profile);
  }
  
  return (
    <div className="profile-page">
      <JobSeekerProfileForm formChangeCallback={handleJobSeekerFormChange} />
    </div>
  )
}

export default pageWrapper(ProfilePage, {
  authorisedUserTypes: [
    EUserType.Admin,
    EUserType.JobSeeker
  ]
});
