import React from 'react'
import './Pill.scss';

export type PillVariant = 'green' | 'orange' | 'red';

interface PillProps {
  className?: string;
  text: string;
  variant: PillVariant;
}

const Pill = (props: PillProps) => {
  return (
    <div className={`pill pill--${props.variant} ${props.className}`}>
      {props.text}
    </div>
  )
}

export default Pill
