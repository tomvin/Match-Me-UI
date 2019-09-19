import React from 'react'
import Alert from '../../../shared/components/Alert/Alert'
import { IUser } from '../../../../models/User';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../redux/appState';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import noJobsImg from '../../../../images/empty.svg';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import './NoMatchesFound.scss';

const NoMatchesFound = () => {
  const user: IUser | null = useSelector((state: IAppState) => state.authentication.user);
  const { loading, error, data } = useQuery(gql`
  query potentialJobs($id:String!){
    jobSeekerMatch(id:$id){
      score
    }
  }
  `, { variables: { id: user ? user._id : '' } });

  if (loading) return <Loading />;
  if (error) return <Error />;
  
  return (
    <div className="no-matches-found">
      <Alert 
        variant="purple" 
        title={`No Matches`} 
        message={`Start looking at the ${data.jobSeekerMatch.length} new jobs we found for you`} 
        route="/potential-jobs"
      />
      <img className="no-matches-found__image" src={noJobsImg} alt="Error" />
    </div>
  )
}

export default NoMatchesFound
