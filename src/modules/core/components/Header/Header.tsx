import React from 'react'
import './Header.scss';
import MatchMeLogo from '../../../shared/components/MatchMeLogo/MatchMeLogo';
import DropdownMenu from '../../../shared/components/DropdownMenu/DropdownMenu';

export interface HeaderProps {
  appName: string | undefined;
  userEmail: string;
  logoutFn: any;
}

const Header = (props: HeaderProps) => {
  const handleLogout = () => {
    props.logoutFn();
  }

  return (
    <header>
      <div className="header">
        <div className="header__left">
          <MatchMeLogo className="app-logo" />
        </div>
        <div className="header__right">
          <DropdownMenu 
            className="user-dropdown" 
            label={props.userEmail} 
            menuItems={[{ label: 'Logout', icon: 'sign-out-alt', callbackFunction: handleLogout }]}/>
        </div>
      </div>
    </header>
  )
}

export default Header
