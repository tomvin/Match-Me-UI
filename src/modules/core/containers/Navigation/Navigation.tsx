import React, { useState } from 'react'
import './Navigation.scss';
import NavigationItem from '../../components/NavigationItem/NavigationItem';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface NavState {
  navItems: NavItem[];
}

interface NavItem {
  label: string;
  route: string;
  icon: IconProp;
}

const Navigation = () => {
  const [navState]: [NavState, any] = useState({
    navItems: [
      { label: 'My Matches', route: '/matched-jobs', icon: ['far', 'handshake'] },
      { label: 'Potential Jobs', route: '/potential-jobs', icon: ['fas', 'search'] },
      // { label: 'Profile', route: '/profile', icon: ['far', 'user'] },
    ]
  });

  return (
    <div className="nav-wrapper">
      <nav>
        {
          navState.navItems.map((navItem, i) => (
            <NavigationItem key={i} route={navItem.route} label={navItem.label} icon={navItem.icon}></NavigationItem>
          ))
        }
      </nav>
    </div>
  )
}

export default Navigation
