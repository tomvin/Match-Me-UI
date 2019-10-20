import gql from "graphql-tag";

export type DeleteJobVariables = {
  jobId: string;
}

export type DeleteJobResult = {
    deleteJob: boolean;
}

export const DELETE_JOB = gql`
  mutation DeleteJob($jobId: String) {
    deleteJob(jobId: $jobId)
  }   
`;