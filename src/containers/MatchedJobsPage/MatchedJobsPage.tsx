import React from 'react'
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import './MatchedJobsPage.scss';
import Alert from '../../components/Alert/Alert';
import noJobsImg from '../../images/empty.svg';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/appState';
import { IUser } from '../../models/User';

const MatchedJobsPage = () => {
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
    <div className="matched-jobs-page">
      <Alert 
        variant="purple" 
        title="No Matches" 
        message={`Start looking at the ${data.jobSeekerMatch.length} new jobs we found for you`} 
        route="/potential-jobs"
      />
      <img className="matched-jobs-page__image" src={noJobsImg} alt="Error" />
    </div>
  )
}

export default pageWrapper(MatchedJobsPage)
