import React, { useState } from 'react'
import './JobSeekerProfileForm.scss';
import Input from '../Input/Input';
import { useQuery } from '@apollo/react-hooks';
import { ALL_COMPETENCES_QUERY, AllCompetencesResult } from '../../../../api/queries/allCompetencesQuery';
import { AllEducationResult, ALL_EDUCATION_QUERY } from '../../../../api/queries/allEducationQuery';
import { TYPE_OF_WORK_SELECT_OPTIONS } from '../../../../utils/TypeOfWorkSelectOptions';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Select from '../Select/Select';

interface Props {
  jobSeekerProfile?: JobSeekerProfile;
  formChangeCallback: (form: JobSeekerProfile) => any;
}

export interface JobSeekerProfile {
  fname: string;
  location: string;
  salary: number;
  phone: string;
  competence: string[];
  education: string[];
  typeofwork: number;
  education_p: number;
  competence_p: number;
  salary_p: number;
  typeofwork_p: number;
  location_p: number;
}

const DEFAULT_PROFILE: JobSeekerProfile = {
  fname: '',
  location: '',
  salary: 0,
  phone: '',
  competence: [],
  education: [],
  typeofwork: 0,
  education_p: 0.2,
  competence_p: 0.2,
  salary_p: 0.2,
  typeofwork_p: 0.2,
  location_p: 0.2
}

const JobSeekerProfileForm = ({ jobSeekerProfile, formChangeCallback }: Props) => {
  const [form, setForm] = useState<JobSeekerProfile>( jobSeekerProfile ? jobSeekerProfile : DEFAULT_PROFILE);
  const { data: competences, loading: loadingCompetences, error: errorLoadingCompetences } = useQuery<AllCompetencesResult>(ALL_COMPETENCES_QUERY);
  const { data: education, loading: loadingEducation, error: errorLoadingEducation } = useQuery<AllEducationResult>(ALL_EDUCATION_QUERY);

  /**
   * Handles updating the form state based on the form input which
   * changed, and the new value. 
   */
  const handleInputChange = (event: any): void => {
    let parsedValue;
    
    // If type of input is one of the priorities, parse it into a float
    if (event.target.type === 'salary_p' || 
        event.target.type === 'typeofwork_p' ||
        event.target.type === 'location_p' ||
        event.target.type === 'competence_p' ||
        event.target.type === 'education_p') {
      parsedValue = parseFloat(event.target.value);
    } else if (event.target.type === 'number') {
      // Else if type of input is any other number then parse it into a int
      parsedValue = parseInt(event.target.value);
    } else {
      // else just leave it as a string.
      parsedValue = event.target.value;
    }

    const newForm: JobSeekerProfile = {
      ...form,
      [event.target.name]: parsedValue,
    };
    
    setForm(newForm);
    formChangeCallback(newForm);
  }

  const handleSelectChange = (event: any, isArray: boolean, formProperty: string) => {
    const newForm: JobSeekerProfile = {
      ...form,
      [formProperty]: isArray ? (event ? event.map((old: any) => old.value) : []) : (event ? event.value : ''),
    };

    setForm(newForm);
    formChangeCallback(newForm);
  }

  const mapCompetencesToSelect = (competences: AllCompetencesResult | undefined): any[] => {
    if (!competences || !competences.competence) {
      return [];
    }

    return competences.competence.map((competence: any) => ({
      value: competence._id,
      label: `${competence.skill} : ${competence.level}`
    }));
  }

  const mapEducationToSelect = (educations: AllEducationResult | undefined): any[] => {
    if (!educations || !educations.education) {
      return [];
    }

    return educations.education.map((education: any) => ({
      value: education._id,
      label: `${education.level} : ${education.field}`
    }));
  }

  if (loadingCompetences || loadingEducation) return <Loading />;
  if (errorLoadingCompetences || errorLoadingEducation) return <Error errorDescription="There's a problem loading a education and competence data." />

  return (
    <div className="job-seeker-profile-form">
      <Input value={form.fname} onChange={handleInputChange} name="fname" required type="text" label="Your Name" placeholder="John Johnson" />
      <Input value={form.phone} onChange={handleInputChange} name="phone" required type="text" label="Phone number" placeholder="0459632145" />
      <Input value={form.salary} onChange={handleInputChange} name="salary" required type="number" label="Desired Salary" placeholder="40000" />
      <Input value={form.location} onChange={handleInputChange} name="location" required type="location" label="Location" placeholder="Melbourne" />
      <Select
        label="Select your skills"
        isMulti
        name="competence"
        options={mapCompetencesToSelect(competences)}
        classNamePrefix="select"
        onChange={(e: any) => handleSelectChange(e, true, 'competence')}
      />
      <Select
        label="Select your education"
        isMulti
        name="education"
        options={mapEducationToSelect(education)}
        classNamePrefix="select"
        onChange={(e: any) => handleSelectChange(e, true, 'education')}
      />
      <Select
        label="Select your work type"
        name="typeofwork"
        options={TYPE_OF_WORK_SELECT_OPTIONS}
        classNamePrefix="select"
        onChange={(e: any) => handleSelectChange(e, false, 'typeofwork')}
      />
      <label>Select the Prioity of the fields(The total of these fields must equal 1)</label>
      <div className="Priorities1">
        <Input value={form.salary_p} onChange={handleInputChange}  name="salary_p" required type="salary_p" label="Salary Prioity" placeholder="0.20" />
        <Input value={form.education_p} onChange={handleInputChange} name="education_p" required type="education_p" label="Education Prioity" placeholder="0.20" />
        <Input value={form.location_p} onChange={handleInputChange} name="location_p" required type="location_p" label="Location Prioity" placeholder="0.20" />
        <Input value={form.competence_p} onChange={handleInputChange} name="competence_p" required type="competence" label="Competence Prioity" placeholder="0.20" />
        <Input value={form.typeofwork_p} onChange={handleInputChange} name="typeofwork_p" required type="typeofwork_p" label="Work Prioity" placeholder="0.20" />
      </div>
    </div>
  )
}

export default JobSeekerProfileForm
