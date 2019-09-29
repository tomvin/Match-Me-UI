import gql from "graphql-tag";

export type AcceptJobSeekerVariables = {
  acceptInput: {
    userId: string;
    jobId: string;
  }
}

export type AcceptJobSeekerResult = {
  acceptJobSeeker: 'Already 1 Way Match' | '1 Way Match' | string;
}

export const ACCEPT_JOB_SEEKER = gql`
  mutation AcceptJobSeeker($acceptInput: AcceptInput!) {
    acceptJobSeeker(acceptInput: $acceptInput)
  }
`;