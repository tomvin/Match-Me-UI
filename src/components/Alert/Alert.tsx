import React from 'react'
import './Alert.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  variant: 'purple' | 'red';
  title: string;
  message: string;
  className?: string;
  route?: string;
}

const Alert = (props: Props) => {
  if (props.route) {
    return (
      <NavLink to={props.route} className={`alert alert--link alert--${props.variant} ${props.className}`}>
        <div className="alert__title">{props.title}</div>
        <div className="alert__message">{props.message}</div>
        <FontAwesomeIcon className="alert__icon" icon={['fas', 'chevron-right']} />
      </NavLink>
    )
  }

  return (
    <div className={`alert alert--${props.variant} ${props.className}`}>
      <div className="alert__title">{props.title}</div>
      <div className="alert__message">{props.message}</div>
    </div>
  )
}

export default Alert
