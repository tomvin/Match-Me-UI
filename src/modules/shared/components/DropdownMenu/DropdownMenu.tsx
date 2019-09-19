import React from 'react';
import './DropdownMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface State {
  displayMenu: boolean;
}

interface Props {
  className?: string;
  label: string;
  menuItems: DropdownMenuItem[];
}

export interface DropdownMenuItem {
  label: string;
  icon?: IconProp;
  callbackFunction: any;
}

class DropdownMenu extends React.Component<Props, State> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      displayMenu: false,
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.hideDropdownMenu);
  }

  showDropdownMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    return (
        <div className="dropdown-menu">
          <div className={`dropdown-menu__btn ${this.props.className}`} onClick={this.showDropdownMenu}>
            <span className="btn__label">{this.props.label}</span>
            <FontAwesomeIcon className="btn__icon" icon={this.state.displayMenu ? 'caret-up' : 'caret-down'}/>
          </div>
          { 
            this.state.displayMenu ? 
            <ul className="dropdown-menu__menu">
              {
                this.props.menuItems.map((menuItem, key) => (
                  <li 
                    key={key} 
                    className="menu-item"
                    onClick={menuItem.callbackFunction}>
                    { menuItem.icon ? 
                      <FontAwesomeIcon 
                        className="menu-item__icon" 
                        icon={menuItem.icon}
                      /> 
                      : '' 
                    }
                    <span 
                      className="menu-item__label">
                        {menuItem.label}
                    </span>
                  </li>
                ))
              }
            </ul> 
            : ''
          }
       </div>
    );
  }
}

export default DropdownMenu;