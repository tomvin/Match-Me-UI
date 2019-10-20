import React from 'react';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';

const CompaniesPage = () => {
  return <div></div>
}

export default pageWrapper(CompaniesPage, { authorisedUserTypes: [ EUserType.Admin ] });