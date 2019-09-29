import { gql } from 'apollo-boost';

export type UserForJobMatchFragment = {
  _id: string;
  email: string;
  jobSeeker: {
    _id: string;
    name: string;
  }
}

export const USER_FOR_JOB_MATCH_FRAGMENT = gql`
  fragment UserForJobMatch on User {
    _id
    email
    jobSeeker {
      _id
      name
    }
  }
`;