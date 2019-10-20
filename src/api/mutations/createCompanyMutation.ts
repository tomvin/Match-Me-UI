import gql from "graphql-tag";

export type CreateCompanyVariables = {
  companyInput: {
    name: string;
    phone: string;
    email: string;
    logoUrl: string;
  }
  userInput: {
    email: string;
    password: string;
    profilePictureUrl: string;

  }
}

export type CreateCompanyResult = {
  createCompany: {
    _id: string;
  }
}

export const CREATE_COMPANY = gql`
  mutation CreateCompany($companyInput: CompanyInput!, $userInput: UserInput) {
    createCompany(companyInput: $companyInput, userInput: $userInput) {
      _id
    }
  }
`;