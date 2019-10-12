import gql from "graphql-tag";
import { IUser } from "../../models/User";

export type AllJobSeekerUsersResult = {
  users: IUser[] | undefined;
}

export const ALL_JOB_SEEKER_USERS_QUERY =  gql`
query AllJobSeekerUsers {
  users {
    _id
    email
    profilePictureUrl
    jobSeeker {
      _id
      name
      phone
      location
      typeofwork
      salary
      education {
        _id
        level
        field
      }
      competence {
        _id
        level
        skill
      }
    }
  }
}
`;