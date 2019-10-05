import React, { useState } from 'react'
import './ProfilePage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import JobSeekerProfileForm, { JobSeekerProfile, DEFAULT_JOB_SEEKER_PROFILE } from '../../../shared/components/JobSeekerProfileForm/JobSeekerProfileForm';
import { useSelector } from 'react-redux';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';
import { useQuery } from '@apollo/react-hooks';
import { ALL_JOB_SEEKER_USERS_FOR_PROFILE_QUERY, AllJobSeekerUsersForProfileResult, JobSeekerUserForProfile } from '../../../../api/queries/allJobSeekerUsersForProfileQuery';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { mapCompetencesToSelect } from '../../../../utils/MapCompetenceToSelectItem';
import { mapEducationsToSelect } from '../../../../utils/MapEducationToSelectItem';
import { mapTypeOfWorkToSelect } from '../../../../utils/MapTypeOfWorkToSelectItem';
import Button from '../../../shared/components/Button/Button';
import Card from '../../../shared/components/Card/Card';

const ProfilePage = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  const { loading, error, data } = useQuery<AllJobSeekerUsersForProfileResult>(ALL_JOB_SEEKER_USERS_FOR_PROFILE_QUERY, { fetchPolicy: 'network-only' });
  const [profile, setProfile] = useState<JobSeekerProfile | null>(null);

  const canSaveChanges = (): boolean => {
    return profile !== null;
  }

  const getJobSeekerProfileFromData = (result: AllJobSeekerUsersForProfileResult | undefined): JobSeekerUserForProfile | undefined => {
    if (!result || !result.jobSeekerUsersForProfile) {
      return undefined;
    }

    return result.jobSeekerUsersForProfile.find(p => p._id === user._id);
  }

  const mapUserToJobSeekerProfile = (profile: JobSeekerUserForProfile | undefined): JobSeekerProfile => {
    if (!profile) {
      return DEFAULT_JOB_SEEKER_PROFILE;
    }

    return {
      ...DEFAULT_JOB_SEEKER_PROFILE,
      fname: profile.jobSeeker.name,
      location: profile.jobSeeker.location,
      salary: profile.jobSeeker.salary,
      phone: profile.jobSeeker.phone,
      competence: profile.jobSeeker.competence ? mapCompetencesToSelect(profile.jobSeeker.competence) : [],
      education: profile.jobSeeker.education ? mapEducationsToSelect(profile.jobSeeker.education) : [],
      typeofwork: mapTypeOfWorkToSelect(profile.jobSeeker.typeofwork),
      education_p: profile.jobSeeker.education_p,
      competence_p: profile.jobSeeker.competence_p,
      location_p: profile.jobSeeker.location_p,
      typeofwork_p: profile.jobSeeker.typeofwork_p,
      salary_p: profile.jobSeeker.salary_p
    }
  }

  const handleJobSeekerFormChange = (profile: JobSeekerProfile): void => {
    setProfile(profile);
  }

  if (loading) return <Loading />
  if (error) return <Error />
  
  return (
    <div className="profile-page">
      <Card>
        <Button icon="save" disabled={!canSaveChanges()} className="update-profile-button" variant="primary">Update Profile</Button>
        <JobSeekerProfileForm
          jobSeekerProfile={mapUserToJobSeekerProfile(getJobSeekerProfileFromData(data))}
          formChangeCallback={handleJobSeekerFormChange} />
      </Card>
    </div>
  )
}

export default pageWrapper(ProfilePage, {
  authorisedUserTypes: [
    EUserType.Admin,
    EUserType.JobSeeker
  ]
});
