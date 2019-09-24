import React from 'react';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import { EUserType } from '../../../models/UserType'

const CreateNewJob = () => {
    return <div>
        <p>Create new job page</p>
    </div>;
};

export default pageWrapper(CreateNewJob, { authorisedUserTypes: [EUserType.Company] })
