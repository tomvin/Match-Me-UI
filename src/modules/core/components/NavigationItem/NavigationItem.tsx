import React from 'react'
import './NavigationItem.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface NavItem {
  label: string;
  route: string;
  icon: IconProp;
}

const NavigationItem = (props: NavItem) => {
  return (
    <NavLink className="navigation-item" activeClassName="navigation-item--active" to={props.route}>
      <FontAwesomeIcon className="navigation-item__icon" icon={props.icon} />
      <span className="navigation-item__label">
        { props.label }
      </span>
    </NavLink>
  )
}

export default NavigationItem
