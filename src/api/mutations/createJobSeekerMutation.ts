import gql from "graphql-tag";

export type CreateJobSeekerVariables = {
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
  userInput: {
    email: string;
    password: string;
  }
}

export type CreateJobSeekerResult = {
  createJobSeeker: {
    _id: string;
  }
}

export const CREATE_JOB_SEEKER = gql`
  mutation CreateJobSeeker($jobSeekerInput: JobSeekerInput!, $userInput: UserInput) {
    createJobSeeker(jobSeekerInput: $jobSeekerInput, userInput: $userInput) {
      _id
    }
  }
`;