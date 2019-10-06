import gql from "graphql-tag";

export type CreateJobVariables = {
    jobInput: {
        name: string;
        description: string;
        company: string;
        education: string[];
        competence: string[];
        location: string;
        typeofwork?: number;
        salary?: number;
    }
}

export type CreateJobResult = {
  createJob: {
    _id: string;
  }
}

export const CREATE_JOB = gql`
  mutation CreateJob($jobInput: JobInput!) {
    createJob(jobInput: $jobInput) {
      _id
    }
  }
`;