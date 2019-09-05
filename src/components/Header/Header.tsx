import React from 'react'
import './Header.scss';
import MatchMeLogo from '../MatchMeLogo/MatchMeLogo';

export interface HeaderProps {
  appName: string | undefined;
  userEmail: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <div className="header">
        <div className="header__left">
          <MatchMeLogo className="app-logo" />
        </div>
        <div className="header__right">
          <span className="user">{props.userEmail}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
