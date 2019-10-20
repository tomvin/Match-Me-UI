import React from 'react';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';

const JobsPage = () => {
  return <div></div>
}

export default pageWrapper(JobsPage, { authorisedUserTypes: [ EUserType.Admin ] });