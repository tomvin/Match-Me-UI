import { ICompany } from './../../models/Company';
import gql from 'graphql-tag';

export type AllCompaniesResult = {
  companies: ICompany[] | undefined;
}

export const ALL_COMPANIES = gql`
query AllCompanies {
  companies {
    _id
    name
    logoUrl
    phone
    email
  }
}
`;