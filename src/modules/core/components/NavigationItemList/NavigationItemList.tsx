import React from 'react'
import './NavigationItemList.scss';
import NavigationItem, { NavItem } from '../NavigationItem/NavigationItem';

interface Props {
  navItems: NavItem[];
}

const NavigationItemList = (props: Props) => {
  return (
    <div className="nav-wrapper">
      <nav>
        {
          props.navItems.map((navItem, i) => (
            <NavigationItem key={i} route={navItem.route} label={navItem.label} icon={navItem.icon}></NavigationItem>
          ))
        }
      </nav>
    </div>
  )
}

export default NavigationItemList
