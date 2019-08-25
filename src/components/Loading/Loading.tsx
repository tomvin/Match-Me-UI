import React from 'react'
import loading from '../../images/loading.svg';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <img src={loading} alt="Loading..." className="loading__img" />
    </div>
  )
}

export default Loading
