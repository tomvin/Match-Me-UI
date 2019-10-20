import React from 'react'
import './Navigation.scss';
import { NavItem } from '../../components/NavigationItem/NavigationItem';
import { useSelector } from 'react-redux';
import NavigationItemList from '../../components/NavigationItemList/NavigationItemList';
import { selectLoggedInUserType } from '../../../../redux/selectors/authenticationSelectors';
import { EUserType } from '../../../../models/UserType';

const Navigation = () => {
  const userType: EUserType = useSelector(selectLoggedInUserType);

  const getNavItemsForUser = (type: EUserType): NavItem[] => {
    switch (type) {
      case EUserType.Admin: return [
        { label: 'Users', route: '/admin/users', icon: ['fas', 'user'] },
        { label: 'Jobs', route: '/admin/jobs', icon: ['fas', 'file-contract'] },
        { label: 'Companies', route: '/admin/companies', icon: ['fas', 'industry'] },
      ];
      case EUserType.Company: return [
        { label: 'Job Postings', route: '/company/jobs', icon: ['fas', 'file-contract'] },
        { label: 'My Company', route: '/company/profile', icon: ['fas', 'industry'] },
      ];
      case EUserType.JobSeeker: return [
        { label: 'My Matches', route: '/matched-jobs', icon: ['far', 'handshake'] },
        { label: 'Potential Jobs', route: '/potential-jobs', icon: ['fas', 'search'] },
        { label: 'My Profile', route: '/profile', icon: ['fas', 'user'] },
      ]
      case EUserType.Unknown: 
      default:
        return [];
    }
  }

  return (
    <NavigationItemList navItems={getNavItemsForUser(userType)}/>
  )
}

export default Navigation
