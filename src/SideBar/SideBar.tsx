import React from 'react';
import { MenuItem } from '../Models/MenuItem';
import { Link } from '@reach/router';
import { Icon, Tooltip } from '@material-ui/core';
import './SideBar.scss';

type SideBarProps = {
  menuItems: MenuItem[];
}

class SideBar extends React.Component<SideBarProps> {

  render() {
    return (
      <div className="sidebar">
        {
          this.props.menuItems.map((menuItem, i) => (
            <Tooltip key={i} placement="right" title={menuItem.label}>
              <Link 
                getProps={({ isCurrent }) => 
                  { return { className: isCurrent ? 'menu-item menu-item--active' : 'menu-item' } }} 
                to={menuItem.route}>
                <Icon fontSize="default">{ menuItem.icon }</Icon>
              </Link>
            </Tooltip>
          ))
        }
      </div>
    )
  }
}

export default SideBar;