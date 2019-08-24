import React from 'react'
import './Pill.scss';

interface PillProps {
  className?: string;
  text: string;
  variant: 'green' | 'orange' | 'red';
}

const Pill = (props: PillProps) => {
  return (
    <div className={`pill pill--${props.variant} ${props.className}`}>
      {props.text}
    </div>
  )
}

export default Pill
