import gql from "graphql-tag";

export type CompanyJobPostingsResult = {
  companyJobPostings: CompanyJobPosting[] | undefined;
}

export type CompanyJobPosting = {
  _id: string;
  name: string;
  description: string;
  company: { _id: string; };
  jobSeekerInterest: { _id: string; }[];
  completeJobSeekerMatch: { _id: string; }[];
}

export const COMPANY_JOB_POSTINGS_QUERY =  gql`
query CompanyJobPostingss {
  companyJobPostings: jobs{
    _id
    name
    description
    company{
      _id
    }
    jobSeekerInterest{
      _id
    }
    completeJobSeekerMatch{
      _id
    }
  }
}
`;