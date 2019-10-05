import React from 'react'
import './ProfilePage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import JobSeekerProfileForm, { JobSeekerProfile, DEFAULT_JOB_SEEKER_PROFILE } from '../../../shared/components/JobSeekerProfileForm/JobSeekerProfileForm';
import { useSelector } from 'react-redux';
import Error from '../../../shared/components/Error/Error';
import { IJobSeeker } from '../../../../models/JobSeeker';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';

const ProfilePage = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  if (!user || !user.jobSeeker) return <Error />

  const mapUserToJobSeekerProfile = (jobSeeker: IJobSeeker): JobSeekerProfile => {
    return {
      ...DEFAULT_JOB_SEEKER_PROFILE,
      fname: jobSeeker.name,
      location: jobSeeker.location,
      salary: jobSeeker.salary,
      phone: jobSeeker.phone,
      competence: jobSeeker.competence ? jobSeeker.competence.map(c => c._id) : [],
      education: jobSeeker.education ? jobSeeker.education.map(e => e._id) : [],
      typeofwork: jobSeeker.typeofwork,
      education_p: jobSeeker.education_p,
      competence_p: jobSeeker.competence_p,
      location_p: jobSeeker.location_p,
      typeofwork_p: jobSeeker.typeofwork_p,
      salary_p: jobSeeker.salary_p
    }
  }

  const handleJobSeekerFormChange = (profile: JobSeekerProfile): void => {
    console.log(profile);
  }
  
  return (
    <div className="profile-page">
      <JobSeekerProfileForm
        jobSeekerProfile={mapUserToJobSeekerProfile(user.jobSeeker as any)}
        formChangeCallback={handleJobSeekerFormChange} />
    </div>
  )
}

export default pageWrapper(ProfilePage, {
  authorisedUserTypes: [
    EUserType.Admin,
    EUserType.JobSeeker
  ]
});
