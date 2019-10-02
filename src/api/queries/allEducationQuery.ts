import gql from "graphql-tag";
import { IEducation } from "../../models/Education";

export type AllEducationResult = {
  education: IEducation[] | undefined;
}

export const ALL_EDUCATION_QUERY =  gql`
  query AllEducation {
    education{
      _id
      level
      field
    }
  }
`;