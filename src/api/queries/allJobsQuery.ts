import gql from 'graphql-tag';

export type AllJobsResult = {
  jobs: AllJobsJob[] | undefined;
}
  
export type AllJobsJob = {
  _id: string;
  name: string;
  description: string;
  company: {
    _id: string;
    name: string;
    logoUrl: string;
  }
}

export const ALL_JOBS_QUERY = gql`
query AllJobs {
  jobs{
    _id
    name
    description
    company{
      _id
      name
      logoUrl
    }
  }
}
`;