import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useQuery } from '@apollo/react-hooks';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import Select, { SelectItem } from '../../shared/components/Select/Select';
import Input from '../../shared/components/Input/Input';
import { mapCompetencesToSelect } from '../../../utils/MapCompetenceToSelectItem';
import {mapEducationsToSelect} from '../../../utils/MapEducationToSelectItem';
import { ALL_COMPETENCES_QUERY, AllCompetencesResult } from '../../../api/queries/allCompetencesQuery';
import { AllEducationResult, ALL_EDUCATION_QUERY } from '../../../api/queries/allEducationQuery';
import { IAuthenticationState } from "../../../redux/slices/authenticationSlice";
import { IAppState } from '../../../redux/appState';
import { EUserType } from '../../../models/UserType'

interface Job {
    jobTitle?: string,
    description?: string,
    competence?: SelectItem<string>[],
    education?: SelectItem<string>[],
    location?: string,
    salary?: number,
    typeofwork?: SelectItem<number>
}

const TYPE_OF_WORK: any = [
    { value: 1, label: 'Full Time' },
    { value: 2, label: 'Part Time' },
    { value: 3, label: 'Casual' },
    { value: 4, label: 'Full Time/Casual' },
    { value: 5, label: 'Part Time/Casual' },
    { value: 6, label: 'Full Time/Part Time' },
    { value: 7, label: 'Full Time/Part Time/Casual' },
  ];

const CreateNewJob = () => {
    const [ newJob, setNewJob ] = useState<Job>({});
    const { data: competenceData, loading: loadingCompetences, error: errorLoadingCompetences } = useQuery<AllCompetencesResult>(ALL_COMPETENCES_QUERY);
    const { data: educationData, loading: loadingEducation, error: errorLoadingEducation } = useQuery<AllEducationResult>(ALL_EDUCATION_QUERY);
    const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);

    const handleSelectChange = (value: any, action: any) => {
        setNewJob({...newJob, [action.name]: value });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewJob({...newJob, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("creating new job with...", newJob, authState);
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
    if (!competenceData || !competenceData.competence || !educationData || !educationData.education || errorLoadingCompetences || errorLoadingEducation) return <div>Error!</div>;

    return (
        <form onSubmit={handleSubmit}>
            <Input value={newJob.jobTitle} name="jobTitle" type="text" required label="Job title" onChange={handleChange} />
            <Input value={newJob.description} name="description" type="text" required label="Job description" onChange={handleChange}  />
            <Input value={newJob.location} name="location" type="text" required label="Location" onChange={handleChange}  />
            <Input value={newJob.salary} name="salary" type="number" label="Salary" onChange={handleChange}  />
            <Select
                label="Select your work type"
                name="typeofwork"
                options={TYPE_OF_WORK}
                className="basic-single"
                classNamePrefix="select"
                onChange={handleSelectChange}
            />
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
