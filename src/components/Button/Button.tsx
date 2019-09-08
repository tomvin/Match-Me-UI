import React from 'react'
import './Button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Loading from '../Loading/Loading';

interface Props {
  icon?: IconProp;
  variant: 'primary' | 'secondary';
  children?: any;
  className?: string;
  onClick?: any;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  loading?: boolean;
}

const Button = (props: Props) => {
  return (
    <button type={props.type ? props.type : 'button'} className={`button button--${props.variant} ${props.className} ${props.loading ? 'button--loading' : ''}`} onClick={props.onClick} disabled={props.disabled ? props.disabled : false}>
      {
        props.loading !== true ? (
          <React.Fragment>
            {props.icon ? <FontAwesomeIcon className="button__icon" icon={props.icon}/> : ''}
            {props.children}
          </React.Fragment>
        ) : <Loading />
      }
    </button>
  )
}

export default Button
