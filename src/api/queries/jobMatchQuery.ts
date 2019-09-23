import gql from "graphql-tag";
import { USER_FOR_JOB_MATCH_FRAGMENT } from '../fragments/userForJobMatchFragment';
import { IJobMatch } from "../../models/JobMatch";

export type JobMatchVariables = {
  jobId: string;
}

export type JobMatchResult = {
  jobMatch: IJobMatch[] | undefined;
}

export const JOB_MATCH_QUERY =  gql`
query JobMatch($jobId:String!) {
  jobMatch(jobId:$jobId){
    score
    user {
      ...UserForJobMatch
    }
  }
}
${USER_FOR_JOB_MATCH_FRAGMENT}
`;