import React from 'react'
import './JobPotentialMatches.scss';
import { useQuery } from '@apollo/react-hooks';
import { JobMatchResult, JobMatchVariables, JOB_MATCH_QUERY } from '../../../../api/queries/jobMatchQuery';
import List from '../../../shared/components/List/List';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import { convertMatchScoreToPillVariant } from '../../../../utils/ConvertMatchScoreToPillVariant';
import Loading from '../../../shared/components/Loading/Loading';

interface Props {
  jobId: string;
}

const JobPotentialMatches = (props: Props) => {
  const { loading: loadingJobMatches, error: errorLoadingJobMatches, data: jobMatches } = useQuery<JobMatchResult, JobMatchVariables>(JOB_MATCH_QUERY, { variables: { jobId: props.jobId } });
  
  const buildPotentialMatchUsersList = (jobMatches: JobMatchResult | undefined): ListItemVM[] => {
    if (!jobMatches || !jobMatches.jobMatch) {
      return [];
    }

    return jobMatches.jobMatch.map<ListItemVM>(match => ({
      type: 'icon',
      route: '',
      title: match.user.email,
      description: 'This user is a great match!',
      pillText: `${(match.score * 100).toFixed(0)}% Match`,
      pillVariant: convertMatchScoreToPillVariant(match.score),
      variant: 'primary',
      icon: 'user'
    }));
  }

  if (loadingJobMatches) return <Loading />
  if (errorLoadingJobMatches) return <div>Error loading potential job matches. </div>
  return <List items={buildPotentialMatchUsersList(jobMatches)} />
}

export default JobPotentialMatches