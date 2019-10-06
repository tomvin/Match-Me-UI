import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useQuery, useMutation } from '@apollo/react-hooks';
import pageWrapper from '../../shared/components/PageWrapper/PageWrapper'
import Card from '../../shared/components/Card/Card';
import Select, { SelectItem } from '../../shared/components/Select/Select';
import Input from '../../shared/components/Input/Input';
import { mapCompetencesToSelect } from '../../../utils/MapCompetenceToSelectItem';
import {mapEducationsToSelect} from '../../../utils/MapEducationToSelectItem';
import { ALL_COMPETENCES_QUERY, AllCompetencesResult } from '../../../api/queries/allCompetencesQuery';
import { AllEducationResult, ALL_EDUCATION_QUERY } from '../../../api/queries/allEducationQuery';
import { CreateJobVariables, CreateJobResult, CREATE_JOB } from '../../../api/mutations/createJobMutation';
import { IAuthenticationState } from "../../../redux/slices/authenticationSlice";
import { IAppState } from '../../../redux/appState';
import { EUserType } from '../../../models/UserType'

interface Job {
    jobTitle?: string,
    description?: string,
    competence?: SelectItem<string>[],
    education?: SelectItem<string>[],
    location?: string,
    salary?: string,
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

const transformNewJob = (authState: IAuthenticationState, newJobState: Job): CreateJobVariables => {
    const companyId = authState.user && authState.user.company && authState.user.company._id;
    const educationIds = newJobState.education && newJobState.education.map(e => e.value);
    const competenceIds = newJobState.competence && newJobState.competence.map(e => e.value);
    const salary = parseInt((newJobState.salary || '0'), 10)

    return {
        jobInput: {
            name: newJobState.jobTitle || "",
            company: companyId || "",
            education: educationIds || [],
            competence: competenceIds || [],
            location: newJobState.location || "",
            typeofwork: newJobState.typeofwork && newJobState.typeofwork.value,
            salary: salary,
            description: newJobState.description || ""
        }
    }
}

const CreateNewJob = () => {
    const [ newJob, setNewJob ] = useState<Job>({});
    const { data: competenceData, loading: loadingCompetences, error: errorLoadingCompetences } = useQuery<AllCompetencesResult>(ALL_COMPETENCES_QUERY);
    const { data: educationData, loading: loadingEducation, error: errorLoadingEducation } = useQuery<AllEducationResult>(ALL_EDUCATION_QUERY);
    const [createJob, { data: createJobResult, error: errorCreateJob }] = useMutation<CreateJobResult, CreateJobVariables>(CREATE_JOB);
    const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);

    const handleSelectChange = (value: any, action: any) => {
        setNewJob({...newJob, [action.name]: value });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewJob({...newJob, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const newJobVariables = transformNewJob(authState, newJob);
        createJob({ variables: newJobVariables });
        event.preventDefault();
        // redirect to job postings page
    }

    if (loadingCompetences || loadingEducation) return <div>Loading...</div>;
    if (!competenceData || !competenceData.competence || !educationData || !educationData.education || errorLoadingCompetences || errorLoadingEducation) return <div>Error!</div>;

    return (
        <div className="profile-page">
            <Card>
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
                    <input type="submit" value="Create" className="button button--primary" />
                </form>
                { createJobResult ? <div>Job posted successfully! </div> : '' }
                { errorCreateJob ? <div>Job cannot be created :(</div> : '' }
            </Card>
        </div>
    );
};

export default pageWrapper(CreateNewJob, { authorisedUserTypes: [EUserType.Company] })
