import React from 'react';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import { ALL_JOBS_QUERY, AllJobsResult, AllJobsJob } from '../../../../api/queries/allJobsQuery';
import { useQuery } from '@apollo/react-hooks';
import List from '../../../shared/components/List/List';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';

const JobsPage = () => {
    const { loading, error, data } = useQuery<AllJobsResult, any>(ALL_JOBS_QUERY);

    const mapJobsToListItems = (jobs: AllJobsJob[]): ListItemVM[] => jobs.map<ListItemVM>(job => ({
      type: 'image',
      imageUrl: job.company.logoUrl,
      route: '',
      title: job.name,
      description: job.description,
      pillText: job.company.name,
      pillVariant: 'green',
      variant: 'primary'
    }));
  
    if (loading) return <Loading />
    if (error || !data || !data.jobs) return <Error />
  
    return <List items={mapJobsToListItems(data.jobs)}></List>
}

export default pageWrapper(JobsPage, { authorisedUserTypes: [ EUserType.Admin ] });