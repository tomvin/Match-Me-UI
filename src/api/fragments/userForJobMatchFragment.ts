import { gql } from 'apollo-boost';

export type UserForJobMatchFragment = {
  _id: string;
  email: string;
  jobSeeker: {
    _id: string;
    name: string;
    salary: number;
    phone: string;
  }
}

export const USER_FOR_JOB_MATCH_FRAGMENT = gql`
  fragment UserForJobMatch on User {
    _id
    email
    profilePictureUrl
    jobSeeker {
      _id
      name
      salary
      phone
    }
  }
`;