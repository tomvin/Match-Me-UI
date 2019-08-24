import React from 'react';
import './Card.scss';

interface Props {
  children?: any;
  className?: string;
}

const Card = (props: Props) => {
  return (
    <div className={`card ${props.className}`}>{props.children}</div>
  )
}

export default Card
