import React from 'react'
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
  icon?: IconProp;
  variant: 'primary' | 'secondary';
  children?: any;
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

const Button = (props: Props) => {
  return (
    <button className={`button button--${props.variant} ${props.className}`} onClick={props.onClick} disabled={props.disabled ? props.disabled : false}>
      {props.icon ? <FontAwesomeIcon className="button__icon" icon={props.icon}/> : ''}
      {props.children}
    </button>
  )
}

export default Button
