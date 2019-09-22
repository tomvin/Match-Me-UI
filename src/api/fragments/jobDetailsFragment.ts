import { gql } from 'apollo-boost';

export const JOB_DETAILS_FRAGMENT = gql`
  fragment JobDetails on Job {
    _id
    name
    description
    location
    salary
    company{
      _id
      name
      logoUrl
    }
    education{
      _id
      field
      level
    }
    competence{
      _id
      level
      skill
    }
  }
`;