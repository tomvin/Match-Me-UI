import React, { useState } from 'react';
import './CreateNewJobPage.scss';
import { useSelector } from "react-redux";
import { useQuery, useMutation } from '@apollo/react-hooks';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper'
import Card from '../../../shared/components/Card/Card';
import Select, { SelectItem } from '../../../shared/components/Select/Select';
import Input from '../../../shared/components/Input/Input';
import { mapCompetencesToSelect } from '../../../../utils/MapCompetenceToSelectItem';
import {mapEducationsToSelect} from '../../../../utils/MapEducationToSelectItem';
import { ALL_COMPETENCES_QUERY, AllCompetencesResult } from '../../../../api/queries/allCompetencesQuery';
import { AllEducationResult, ALL_EDUCATION_QUERY } from '../../../../api/queries/allEducationQuery';
import { CreateJobVariables, CreateJobResult, CREATE_JOB } from '../../../../api/mutations/createJobMutation';
import { IAuthenticationState } from "../../../../redux/slices/authenticationSlice";
import { IAppState } from '../../../../redux/appState';
import { EUserType } from '../../../../models/UserType'
import { TYPE_OF_WORK_SELECT_OPTIONS } from '../../../../utils/TypeOfWorkSelectOptions';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import Button from '../../../shared/components/Button/Button';
import { Redirect } from 'react-router-dom';

interface Job {
    jobTitle?: string,
    description?: string,
    competence?: SelectItem<string>[],
    education?: SelectItem<string>[],
    location?: string,
    salary?: string,
    typeofwork?: SelectItem<number>
}

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
    const [createJob, { data: createJobResult, error: errorCreateJob, loading: creatingJob }] = useMutation<CreateJobResult, CreateJobVariables>(CREATE_JOB);
    const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);

    const handleSelectChange = (value: any, action: any) => {
        setNewJob({...newJob, [action.name]: value });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewJob({...newJob, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const newJobVariables = transformNewJob(authState, newJob);
        event.preventDefault();
        createJob({ variables: newJobVariables });
        // redirect to job postings page
    }

    if (loadingCompetences || loadingEducation) return <Loading />;
    if (!competenceData || !competenceData.competence || !educationData || !educationData.education || errorLoadingCompetences || errorLoadingEducation) return <Error />;
    if (createJobResult && createJobResult.createJob && createJobResult.createJob._id) return <Redirect to={`/company/jobs/${createJobResult.createJob._id}`} />
    
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
                        options={TYPE_OF_WORK_SELECT_OPTIONS}
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
                    <Button 
                        className="create-job-button"
                        type="submit" 
                        variant="primary" 
                        icon="plus" 
                        loading={creatingJob}
                    >
                        Create Job
                    </Button>
                </form>
                { createJobResult ? <div>Job posted successfully! </div> : '' }
                { errorCreateJob ? <div>Job cannot be created :(</div> : '' }
            </Card>
        </div>
    );
};

export default pageWrapper(CreateNewJob, { authorisedUserTypes: [EUserType.Company] })
