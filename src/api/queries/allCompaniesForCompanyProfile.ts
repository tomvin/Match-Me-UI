import gql from "graphql-tag";
import { ICompany } from "../../models/Company";

export type CompaniesForCompanyProfileResult = {
  companiesForCompanyProfile: ICompany[] | undefined;
}

export const ALL_COMPANIES_FOR_COMPANY_PROFILE =  gql`
  query CompaniesForCompanyProfile {
    companiesForCompanyProfile:companies{
      _id
      name
      phone
      email
      logoUrl
    }
  }
`;