import gql from "graphql-tag";

export type AllJobSeekerUsersForProfileResult = {
  jobSeekerUsersForProfile: JobSeekerUserForProfile[] | undefined;
}

export type JobSeekerUserForProfile = {
  _id: string;
  isCompany: boolean;
  jobSeeker: {
    _id: string;
    name: string;
    phone: string;
    location: string;
    typeofwork: number;
    salary: number;
    education_p: number;
    competence_p: number;
    location_p: number;
    typeofwork_p: number;
    salary_p: number;
    education: {       
      _id: string;
      field: string;
      level: string;
    }[];
    competence: {
      _id: string;
      level: string;
      skill: string;
    }[];
  }
}

export const ALL_JOB_SEEKER_USERS_FOR_PROFILE_QUERY =  gql`
query JobSeekerUsersForProfile {
  jobSeekerUsersForProfile:users {
    _id
    isCompany
    jobSeeker {
      _id
      name
      phone
      location
      typeofwork
      salary
      education_p
      competence_p
      location_p
      typeofwork_p
      salary_p
      education{       
        _id
        field
        level
      }
      competence{
        _id
        level
        skill
      }
    }
  }
}
`;