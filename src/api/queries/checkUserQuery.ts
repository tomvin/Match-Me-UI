import gql from "graphql-tag";

export type CheckUserVariables = {
  email: string;
  password: string;
}

export type CheckUserResult = {
  checkUser: LoggedInUser | null;
}

export type LoggedInUser = {
  _id: string;
  email: string;
  isCompany: boolean;
  jobSeeker: undefined | {
    _id: string;
    name: string;
  };
  company: undefined | {
    _id: string;
    name: string;
  };
}

export const CHECK_USER_QUERY =  gql`
query CheckUser($email:String!, $password:String!) {
  checkUser(email:$email, password:$password){
    _id
    email
    isCompany
    jobSeeker{
      _id
      name
    }
    company{
      _id
      name
    }
  }
}
`;