import React from 'react'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper'
import Alert from '../../../shared/components/Alert/Alert'
import pageNotFoundImg from '../../../../images/404.svg';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div>
      <div className="not-found-page">
      <Alert 
        variant="red" 
        title="Unknown Page" 
        message={`We can't seem to find the page you're looking for`} 
        route="/"
      />
      <img className="not-found-page__image" src={pageNotFoundImg} alt="404 Page Not Found" />
    </div>
    </div>
  )
}

export default pageWrapper(NotFoundPage)
