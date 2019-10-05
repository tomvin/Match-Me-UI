import gql from "graphql-tag";

export type JobSeekerMatchCountVariables = {
  jobSeekerUserId: string;
}

export type JobSeekerMatchCountResult = {
  jobSeekerMatch: { score: number }[] | undefined;
}

export const JOB_SEEKER_MATCH_COUNT_QUERY =  gql`
query JobSeekerMatchCount($jobSeekerUserId:String!) {
  jobSeekerMatch(jobSeekerUserId:$jobSeekerUserId){
    score
  }
}
`;