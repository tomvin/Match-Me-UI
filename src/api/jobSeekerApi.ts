import { gql } from 'apollo-boost';
import api from './api';
import { IJob } from '../models/Job';

const getJobSeekerMatchOverviews = async (userId: string): Promise<IJob[] | null> => {
  const query = gql`
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
  const result = await api.query<{JobSeekerMatchOverviews: IJob[]}>({ query, variables: { userId }, fetchPolicy: 'network-only' });
  return result.data.JobSeekerMatchOverviews;
};

export default {
  getJobSeekerMatchOverviews
}
