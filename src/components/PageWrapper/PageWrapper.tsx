import React from 'react'
import './PageWrapper.scss';

function pageWrapper(WrappedPage: any) {
  return (props: any) => {
    return (
      <div className="page-wrapper">
        <div className="page-wrapper__inner">
          <WrappedPage {...props} />
        </div>
      </div>
    )
  }
}

export default pageWrapper;
