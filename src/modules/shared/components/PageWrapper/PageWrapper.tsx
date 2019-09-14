import React from 'react'
import './PageWrapper.scss';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../redux/appState';
import { Redirect } from 'react-router-dom';

interface PageWrapperConfig {
  noAuthRequired?: boolean; // If true, user can access this page without being signd in. 
}

const DEFAULT_CONFIG: PageWrapperConfig = {
  noAuthRequired: false
}

const pageWrapper = (WrappedPage: any, config: PageWrapperConfig = DEFAULT_CONFIG) => {
  return (props: any) => {
    const { noAuthRequired } = config;
    const user = useSelector((state: IAppState) => state.authentication.user);

    if (noAuthRequired === true || user) {
      return (
        <div className="page-wrapper">
          <div className="page-wrapper__inner">
            <WrappedPage {...props} />
          </div>
        </div>
      );
    }

    return <Redirect to="/login" />
  }
}

export default pageWrapper;
