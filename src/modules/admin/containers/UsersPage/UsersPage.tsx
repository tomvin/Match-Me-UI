import React from 'react';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import { useQuery } from '@apollo/react-hooks';
import { AllUsersResult, ALL_USERS_QUERY } from '../../../../api/queries/allUsersQuery';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import List from '../../../shared/components/List/List';
import { IUser } from '../../../../models/User';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';

const UsersPage = () => {
  const { loading, error, data } = useQuery<AllUsersResult, any>(ALL_USERS_QUERY);

  const mapUsersToListItems = (users: IUser[]): ListItemVM[] => users.map<ListItemVM>(user => ({
    type: 'image',
    imageUrl: user.profilePictureUrl,
    route: '',
    title: user.email,
    description: mapUserToDescription(user),
    pillText: mapUserToUserType(user),
    pillVariant: 'green',
    variant: 'primary'
  }));

  const mapUserToUserType = (user: IUser): 'Admin' | 'Company Employee' | 'Job Seeker' | 'Unknown' => {
    if (user.isAdmin) return 'Admin';
    if (user.company) return 'Company Employee';
    if (user.jobSeeker) return 'Job Seeker';
    return 'Unknown';
  }

  const mapUserToDescription = (user: IUser) => {
    if (user.isAdmin) return 'An administrator of MatchMe';
    if (user.company) return `This user works for a company named ${user.company.name}`;
    if (user.jobSeeker) return 'This user is a job seeker looking for employment';
    return ''; 
  }

  if (loading) return <Loading />
  if (error || !data || !data.users) return <Error />

  return <List items={mapUsersToListItems(data.users)}></List>
}

export default pageWrapper(UsersPage, { authorisedUserTypes: [ EUserType.Admin ] });