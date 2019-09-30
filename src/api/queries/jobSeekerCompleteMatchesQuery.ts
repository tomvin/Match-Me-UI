import gql from "graphql-tag";
import { IJob } from "../../models/Job";

export type JobSeekerMatchOverviewsVariables = {
  userId: string;
}

export type JobSeekerMatchOverviewsResult = {
  JobSeekerMatchOverviews: IJob[] | undefined;
}

export const JOB_SEEKER_MATCH_OVERVIEWS_QUERY =  gql`
query JobSeekerMatchOverviews($userId:String!) {
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