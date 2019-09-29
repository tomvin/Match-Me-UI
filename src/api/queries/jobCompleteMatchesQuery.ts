import gql from "graphql-tag";
import { USER_FOR_JOB_MATCH_FRAGMENT } from '../fragments/userForJobMatchFragment';
import { IUser } from "../../models/User";

export type JobCompleteMatchVariables = {
  companyUserId: string;
}

export type JobCompleteMatchResult = {
  jobCompleteMatches: { _id: string; completeJobSeekerMatch: IUser[] }[] | undefined;
}

export const JOB_COMPLETE_MATCH_QUERY =  gql`
query JobCompleteMatches($companyUserId:String!) {
  jobCompleteMatches(companyUserId:$companyUserId){
    _id
    completeJobSeekerMatch {
      ...UserForJobMatch
    }
  }
}
${USER_FOR_JOB_MATCH_FRAGMENT}
`;