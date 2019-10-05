import React from 'react'
import './Navigation.scss';
import { NavItem } from '../../components/NavigationItem/NavigationItem';
import { useSelector } from 'react-redux';
import NavigationItemList from '../../components/NavigationItemList/NavigationItemList';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';

const Navigation = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  let navItems: NavItem[] = [
    // { label: 'Profile', route: '/profile', icon: ['far', 'user'] }
  ];

  if (!user) {
    return null;
  } else if (user.isCompany) { // User is logged in as a company user so build company nav menu
    navItems = [
      { label: 'Job Postings', route: '/company/jobs', icon: ['fas', 'file-contract'] },
      { label: 'My Company', route: '/company/profile', icon: ['fas', 'industry'] },
      ...navItems
    ];
  } else { // User is logged in as a job seeker to build seeker menu
    navItems = [
      { label: 'My Matches', route: '/matched-jobs', icon: ['far', 'handshake'] },
      { label: 'Potential Jobs', route: '/potential-jobs', icon: ['fas', 'search'] },
      { label: 'My Profile', route: '/profile', icon: ['fas', 'user'] },
      ...navItems
    ];
  }

  return (
    <NavigationItemList navItems={navItems}/>
  )
}

export default Navigation
