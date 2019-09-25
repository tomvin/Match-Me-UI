import gql from "graphql-tag";
import { IJob } from "../../models/Job";
import { JOB_DETAILS_FRAGMENT } from '../fragments/jobDetailsFragment';

export type MatchedJobDetailsResult = {
  matchedJobDetails: IJob[] | undefined;
}

export const MATCHED_JOB_DETAILS_QUERY =  gql`
query MatchedJobDetails {
  matchedJobDetails: jobs{
    ...JobDetails
  }
}
${JOB_DETAILS_FRAGMENT}
`;