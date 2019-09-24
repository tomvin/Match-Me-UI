import React, { useState } from 'react';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import { EUserType } from '../../../models/UserType'

const CreateNewJob = () => {
    const [ newJob, setNewJob ] = useState({});

    const handleChange = (event: any) => {
        setNewJob({...newJob, [event.target.name]: event.target.value });
    }

    return (<div>
        <div>
            <label>Job title</label>
            <input type="text" name="job-title" onChange={handleChange}/>
        </div>
        <div>
            <label>Company name</label>
            <input type="text" name="company-name" onChange={handleChange}/>
        </div>
        <div>
            <label>Description</label>
            <input type="textarea" name="description" onChange={handleChange}/>
        </div>
        <button onClick={() => console.log(newJob)}>Create</button>
    </div>);
};

export default pageWrapper(CreateNewJob, { authorisedUserTypes: [EUserType.Company] })
