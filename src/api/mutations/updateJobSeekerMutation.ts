import gql from "graphql-tag";

export type UpdateJobSeekerVariables = {
  jobSeekerInput: {
    name: string;
    phone: string;
    education: string[];
    competence: string[];
    location: string;
    typeofwork: number;
    salary: number;
    education_p: number;
    competence_p: number;
    location_p: number;
    typeofwork_p: number;
    salary_p: number;
  }
  jobSeekerUserId: string;
}

export type UpdateJobSeekerResult = {
  updateJobSeeker: {
    _id: string;
  }
}

export const UPDATE_JOB_SEEKER = gql`
  mutation UpdateJobSeeker($jobSeekerUserId: String, $jobSeekerInput: JobSeekerInput!) {
    updateJobSeeker(jobSeekerInput: $jobSeekerInput, jobSeekerUserId: $jobSeekerUserId) {
      _id
    }
  }
`;