import React from 'react'
import './Error.scss';
import Alert from '../Alert/Alert';
import errorImg from '../../../../images/error.svg';

interface Props {
  errorDescription?: string;
  route?: string;
}

const Error = (props: Props) => {
  const DEFAULT_ERROR_TITLE: string = 'Error';
  const DEFAULT_ERROR_MESSAGE: string = 'It seems there was an error trying to load this page for you. Please try again.';
  return (
    <div className="error">
      <Alert 
        route={props.route}
        className="error__alert"
        variant="red" 
        title={DEFAULT_ERROR_TITLE} 
        message={props.errorDescription ? props.errorDescription : DEFAULT_ERROR_MESSAGE} 
      />
      <img className="error__image" src={errorImg} alt="Error" />
    </div>
  )
}

export default Error
