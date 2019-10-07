import React from 'react'
import logo from '../../../../images/match-me-logo-2.svg';
import './MatchMeLogo.scss';
import { NavLink } from 'react-router-dom';

export interface MatchMeLogoProps {
  size?: number; // Size in pixels. eg 32 would set logo to 32px x 32px
  className?: string;
}

const MatchMeLogo = (props: MatchMeLogoProps) => {
  return (
    <NavLink to="/">
      <div className={`match-me-logo ${props.className}`} style={props.size ? {width: props.size, height: props.size} : {}}>
        <img className="match-me-logo__logo" src={logo} alt="Match Me Logo" />
      </div>
    </NavLink>
  )
}

export default MatchMeLogo
