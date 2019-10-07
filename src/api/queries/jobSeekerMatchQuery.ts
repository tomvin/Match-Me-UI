import gql from "graphql-tag";

export type JobSeekerMatchVariables = {
  jobSeekerUserId: string;
}

export type JobSeekerMatchResult = {
  jobSeekerMatch: JobSeekerMatch[] | undefined;
}

export type JobSeekerMatch = {
  score: number;
  job: {
    _id: string;
    name: string;
    description: string;
    company: {
      _id: string;
      name: string;
      logoUrl: string;
    };
  };
}

export const JOB_SEEKER_MATCH_QUERY =  gql`
query JobSeekerMatch($jobSeekerUserId:String!){
  jobSeekerMatch(jobSeekerUserId:$jobSeekerUserId){
    score
    job {
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
}
`;