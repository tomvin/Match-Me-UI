import gql from "graphql-tag";
import { IJob } from "../../models/Job";

export type JobSeekerCompleteMatchesVariables = {
  userId: string;
}

export type JobSeekerCompleteMatchesResult = {
  JobSeekerCompleteMatches: IJob[] | undefined;
}

export const JOB_SEEKER_COMPLETE_MATCHES_QUERY =  gql`
query JobSeekerCompleteMatches($userId:String!) {
  JobSeekerMatchOverviews: jobSeekerCompleteMatches(jobSeekerUserId:$userId){
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