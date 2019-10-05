
import gql from "graphql-tag";
import { ICompetence } from "../../models/Competence";

export type AllCompetencesResult = {
  competence: ICompetence[] | undefined;
}

export const ALL_COMPETENCES_QUERY =  gql`
  query AllCompetences {
    competence {
      _id
      skill
      level
    }
  }
`;