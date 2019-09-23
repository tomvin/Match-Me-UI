import gql from "graphql-tag";
import { IJob } from "../../models/Job";
import { JOB_DETAILS_FRAGMENT } from '../fragments/jobDetailsFragment';

export type AllJobDetailsResult = {
  allJobDetails: IJob[] | undefined;
}

export const ALL_JOB_DETAILS_QUERY =  gql`
query AllJobDetails {
  allJobDetails: jobs{
    ...JobDetails
  }
}
${JOB_DETAILS_FRAGMENT}
`;