import React from 'react'
import './PageWrapper.scss';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../redux/appState';
import { Redirect } from 'react-router-dom';
import { EUserType } from '../../../../models/UserType';
import Unauthorised from '../../../auth/components/Unauthorised/Unauthorised';

interface PageWrapperConfig {
  authorisedUserTypes: EUserType[];
}

const DEFAULT_CONFIG: PageWrapperConfig = {
  authorisedUserTypes: [
    EUserType.Company,
    EUserType.JobSeeker,
    EUserType.Admin
  ]
}

const pageWrapper = (WrappedPage: any, config: PageWrapperConfig = DEFAULT_CONFIG) => {
  return (props: any) => {
    const { authorisedUserTypes } = config;
    const userType: EUserType = useSelector((state: IAppState) => state.authentication.userType); 

    if (authorisedUserTypes.includes(userType) || userType === EUserType.Admin) {
      return (
        <div className="page-wrapper">
          <div className="page-wrapper__inner">
            <WrappedPage {...props} />
          </div>
        </div>
      );
    }

    if (userType === EUserType.Unknown) {
      return <Redirect to="/login" />
    }

    return (
      <div className="page-wrapper">
        <div className="page-wrapper__inner">
          <Unauthorised />
        </div>
      </div>
    )
  }
}

export default pageWrapper;
