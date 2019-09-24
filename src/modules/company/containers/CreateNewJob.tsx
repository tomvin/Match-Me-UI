import React, { useState } from 'react';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import { EUserType } from '../../../models/UserType'

const CreateNewJob = () => {
    const [ newJob, setNewJob ] = useState({}); // newJob = { description: "abc" }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewJob({...newJob, [event.target.name]: event.target.value });
        // {
        //     "jobTitle": "abc",
        //     "description": "awesome job",
        //     "companyName": "company"
        // }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("creating new job with...", newJob);
        // transform data to look like what the DB needs
        // {
        //     job: {
        //         title: newJob.jobTitle
        //     }
        // }
        // send data to db
        event.preventDefault();
        // redirect to job postings page
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Job title</label>
                <input type="text" name="jobTitle" onChange={handleChange}/>
            </div>
            <div>
                <label>Company name</label>
                <input type="text" name="companyName" onChange={handleChange}/>
            </div>
            <div>
                <label>Description</label>
                <input type="text" name="description" onChange={handleChange}/>
            </div>
            <input type="submit" value="Create"/>
        </form>
    );
};

export default pageWrapper(CreateNewJob, { authorisedUserTypes: [EUserType.Company] })
