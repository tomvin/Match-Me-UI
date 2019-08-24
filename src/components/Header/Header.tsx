import React from 'react'
import './Header.scss';
import logo from '../../images/match-me-logo.svg';

export interface HeaderProps {
  appName: string;
  userName: string;
}

const Header = (props: HeaderProps) => {
  return (
    <header>
      <div className="header">
        <div className="header__left">
          <img className="app-logo" src={logo} alt={props.appName + ' Logo'} />
          <span className="app-title">{props.appName}</span>
        </div>
        <div className="header__right">
          <span className="user">{props.userName}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
