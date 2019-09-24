import React, { useState } from 'react';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import { EUserType } from '../../../models/UserType'

const CreateNewJob = () => {
    const [ newJob, setNewJob ] = useState({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewJob({...newJob, [event.target.name]: event.target.value });
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("creating new job with...", newJob);
        event.preventDefault();
    }

    return (
        <form onSubmit={onSubmit}>
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
            <input type="submit" value="Create"/>
        </form>
    );
};

export default pageWrapper(CreateNewJob, { authorisedUserTypes: [EUserType.Company] })
