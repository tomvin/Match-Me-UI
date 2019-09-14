import React from 'react'
import Alert from '../../../shared/components/Alert/Alert'
import noAccessImg from '../../../../images/unauthorised.svg';
import './Unauthorised.scss';

const Unauthorised = () => {
  return (
    <div className="unauthorised">
      <Alert 
        variant="red" 
        title="Unauthorised"
        message="You don't have permission to view this page"
        route="/"
      />
      <img className="unauthorised__image" src={noAccessImg} alt="Unauthorised" />
    </div>
  )
}

export default Unauthorised