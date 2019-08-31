import React from 'react'
import './Header.scss';
import logo from '../../images/match-me-logo-2.svg';

export interface HeaderProps {
  appName: string | undefined;
  userName: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <div className="header">
        <div className="header__left">
          <img className="app-logo" src={logo} alt={props.appName + ' Logo'} />
        </div>
        <div className="header__right">
          <span className="user">{props.userName}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
