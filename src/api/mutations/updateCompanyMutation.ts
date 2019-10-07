import gql from "graphql-tag";

export type UpdateCompanyVariables = {
  companyInput: {
    name: string;
    phone: string;
    email: string;
    logoUrl: string;
  }
  companyUserId: string;
}

export type UpdateCompanyResult = {
  updateCompany: {
    _id: string;
  }
}

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($companyUserId: String, $companyInput: CompanyInput!) {
    updateCompany(companyInput: $companyInput, companyUserId: $companyUserId) {
      _id
    }
  }
`;