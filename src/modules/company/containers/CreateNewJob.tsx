import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import Select, { SelectItem } from '../../shared/components/Select/Select';
import { mapCompetencesToSelect } from '../../../utils/MapCompetenceToSelectItem';
import {mapEducationsToSelect} from '../../../utils/MapEducationToSelectItem';
import { ALL_COMPETENCES_QUERY, AllCompetencesResult } from '../../../api/queries/allCompetencesQuery';
import { AllEducationResult, ALL_EDUCATION_QUERY } from '../../../api/queries/allEducationQuery';
import { EUserType } from '../../../models/UserType'

interface Job {
    jobTitle?: string,
    description?: string,
    companyName?: string,
    competence?: SelectItem<string>[],
    education?: SelectItem<string>[]
}

const CreateNewJob = () => {
    const [ newJob, setNewJob ] = useState<Job>({}); // newJob = { description: "abc" }
    const { data: competenceData, loading: loadingCompetences, error: errorLoadingCompetences } = useQuery<AllCompetencesResult>(ALL_COMPETENCES_QUERY);
    const { data: educationData, loading: loadingEducation, error: errorLoadingEducation } = useQuery<AllEducationResult>(ALL_EDUCATION_QUERY);

    const handleSelectChange = (value: any, action: any) => {
        // const selectedIds = value.map((v: SelectItem<string>) => v.value)
        setNewJob({...newJob, [action.name]: value });
    }

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

    if (loadingCompetences || loadingEducation) return <div>Loading...</div>;
    if (!competenceData || !competenceData.competence || !educationData || !educationData.education) return <div>Error!</div>;

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
            <Select
                required={true}
                label="Select your skills"
                isMulti
                name="competence"
                value={newJob.competence}
                options={mapCompetencesToSelect(competenceData.competence)}
                classNamePrefix="select"
                onChange={handleSelectChange}
            />
            <Select
                label="Select your education"
                isMulti
                name="education"
                options={mapEducationsToSelect(educationData.education)}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectChange}
            />
            <input type="submit" value="Create"/>
        </form>
    );
};

export default pageWrapper(CreateNewJob, { authorisedUserTypes: [EUserType.Company] })
