import React, { useState } from 'react'
import './ProfilePage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import JobSeekerProfileForm, { JobSeekerProfile, DEFAULT_JOB_SEEKER_PROFILE } from '../../../shared/components/JobSeekerProfileForm/JobSeekerProfileForm';
import { useSelector } from 'react-redux';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_JOB_SEEKER_USERS_FOR_PROFILE_QUERY, AllJobSeekerUsersForProfileResult, JobSeekerUserForProfile } from '../../../../api/queries/allJobSeekerUsersForProfileQuery';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { mapCompetencesToSelect } from '../../../../utils/MapCompetenceToSelectItem';
import { mapEducationsToSelect } from '../../../../utils/MapEducationToSelectItem';
import { mapTypeOfWorkToSelect } from '../../../../utils/MapTypeOfWorkToSelectItem';
import Button from '../../../shared/components/Button/Button';
import Card from '../../../shared/components/Card/Card';
import { UpdateJobSeekerResult, UpdateJobSeekerVariables, UPDATE_JOB_SEEKER } from '../../../../api/mutations/updateJobSeekerMutation';

const ProfilePage = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  const { loading, error, data } = useQuery<AllJobSeekerUsersForProfileResult>(ALL_JOB_SEEKER_USERS_FOR_PROFILE_QUERY, { fetchPolicy: 'network-only' });
  const [ profile, setProfile ] = useState<JobSeekerProfile | null>(null);
  const [ updateJobSeeker, { data: updateResult, loading: saving, error: updateError } ] = useMutation<UpdateJobSeekerResult, UpdateJobSeekerVariables>(UPDATE_JOB_SEEKER);

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

  const handleUpdateProfile = (): void => {
    if (!profile) {
      return;
    }

    updateJobSeeker({
      variables: {
        jobSeekerUserId: user._id,
        jobSeekerInput: {
          name: profile.fname,
          phone: profile.phone,
          education: profile.education.map(e => e.value),
          competence: profile.competence.map(e => e.value),
          location: profile.location,
          typeofwork: profile.typeofwork ? profile.typeofwork.value : 0,
          salary: profile.salary,
          education_p: profile.education_p,
          competence_p: profile.competence_p,
          location_p: profile.location_p,
          typeofwork_p: profile.typeofwork_p,
          salary_p: profile.salary_p
        }
      }
    })
  }

  const handleJobSeekerFormChange = (profile: JobSeekerProfile): void => {
    setProfile(profile);
  }

  if (loading) return <Loading />
  if (error || updateError) return <Error />
  
  return (
    <div className="profile-page">
      <Card>
        <Button 
          icon="save" 
          loading={saving}
          disabled={!canSaveChanges()} 
          className="update-profile-button" 
          variant="primary"
          onClick={handleUpdateProfile}
        >
          { updateResult ? `Profile Updated` : `Update Profile` }
        </Button>
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
