import gql from "graphql-tag";
import { IUser } from "../../models/User";

export type AllUsersResult = {
  users: IUser[] | undefined;
}

export const ALL_USERS_QUERY = gql`
query AllUsers {
  users {
    _id
    email
    isCompany
    isAdmin
    profilePictureUrl
    company {
      _id
      name
    }
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