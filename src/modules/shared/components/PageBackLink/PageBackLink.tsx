import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './PageBackLink.scss';

interface Props {
  route: string;
  text: string;
}

const PageBackLink = ({ route, text }: Props) => {
  return (
    <NavLink to={route} className="page-back-link">
      <FontAwesomeIcon className="page-back-link__icon" icon={['fas', 'chevron-left']} />
      <span className="page-back-link__text">{text}</span>
    </NavLink>
  )
}

export default PageBackLink
