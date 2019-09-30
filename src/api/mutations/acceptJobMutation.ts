import gql from "graphql-tag";

export type AcceptJobVariables = {
  acceptInput: {
    userId: string;
    jobId: string;
  }
}

export type AcceptJobResult = {
  acceptJob: 'Already 1 Way Match' | '1 Way Match' | string;
}

export const ACCEPT_JOB = gql`
  mutation AcceptJob($acceptInput: AcceptInput!) {
    acceptJob(acceptInput: $acceptInput)
  }
`;