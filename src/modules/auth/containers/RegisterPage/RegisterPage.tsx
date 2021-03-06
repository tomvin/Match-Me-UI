import React, { useState, FormEvent } from 'react'
import Select from 'react-select';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import './RegisterPage.scss';
import Card from '../../../shared/components/Card/Card';
import MatchMeLogo from '../../../shared/components/MatchMeLogo/MatchMeLogo';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import { useSelector } from "react-redux";
import { IAuthenticationState } from "../../../../redux/slices/authenticationSlice";
import { IAppState } from '../../../../redux/appState';
import { Redirect } from 'react-router-dom';
import { EUserType } from '../../../../models/UserType';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { CreateJobSeekerResult, CreateJobSeekerVariables, CREATE_JOB_SEEKER } from '../../../../api/mutations/createJobSeekerMutation';
import { CreateCompanyResult, CreateCompanyVariables, CREATE_COMPANY } from '../../../../api/mutations/createCompanyMutation';
import { TYPE_OF_WORK_SELECT_OPTIONS } from '../../../../utils/TypeOfWorkSelectOptions';


interface RegisterPageState {
  email: string;
  email_company: string;
  password: string;
  company: string;
  fname: string;
  location: string;
  salary: number;
  phone: string;
  option: 'Job Seeker' | 'Company';
  competence: string[];
  education: string[];
  typeofwork: number;
  education_p: number;
  competence_p: number;
  salary_p: number;
  typeofwork_p: number;
  location_p: number;
  profilePictureUrl: string;
}

const RegisterPage = () => {
  const [createJobSeeker, { data: createJobSeekerResult }] = useMutation<CreateJobSeekerResult, CreateJobSeekerVariables>(CREATE_JOB_SEEKER);
  const [createCompany] = useMutation<CreateCompanyResult, CreateCompanyVariables>(CREATE_COMPANY);

  const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);
  const [state, setState]: [RegisterPageState, any] = useState({
    attemptingLogin: false,
    email: '',
    email_company: '',
    password: '',
    company: "",
    fname: "",
    location: "",
    salary: 0,
    phone: "",
    option: "Job Seeker",
    competence:[],
    education: [],
    typeofwork: 0,
    education_p: 0.2,
    competence_p: 0.2,
    salary_p: 0.2,
    typeofwork_p: 0.2,
    location_p: 0.2,
    profilePictureUrl: ''
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const createJobSeekerVariables: CreateJobSeekerVariables = {
      jobSeekerInput: {
        name: state.fname,
        phone: state.phone,
        education: state.education,
        competence: state.competence,
        location: state.location,
        typeofwork: state.typeofwork,
        salary: state.salary,
        education_p: state.education_p,
        competence_p: state.competence_p,
        location_p: state.location_p,
        typeofwork_p: state.typeofwork_p,
        salary_p: state.salary_p
      },
      userInput: {
        email: state.email,
        password: state.password,
        profilePictureUrl: state.profilePictureUrl
      }
    };

    const CreateCompanyVariables: CreateCompanyVariables = {
      companyInput: {
        name: state.fname,
        phone: state.phone,
        email: state.email
      },
      userInput: {
        email: state.email_company,
        password: state.password
      }
    };
if(state.option === "Company")
{
    createCompany({
      variables : CreateCompanyVariables
    });
  }
  else
  {
    createJobSeeker({
      variables: createJobSeekerVariables 
    });
  }
}

  const handleInputChange = (event: any) => {
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
    
    setState({
      ...state,
      [event.target.name]: parsedValue,
    });

  }
  const handleRadioChange = ({target: {checked, value}}: any) => {
  
  if(checked === true)
  {
  setState({
      ...state,
      option: value,
    });
  }}
  const handleskillChange = (event: any) => {
   
    setState({
      ...state,
      competence: event ? event.map((old: any) => {
        return old.value
      })
:
[]
    })
  }
  const handleeducationChange = (event: any) => {
    setState({
      ...state,
      education: event ? event.map((old: any) => {
        return old.value
      })
:
[]
    })
  }
  const handleworkChange = (event: any) => {
    setState({
      ...state,
      typeofwork: event ? event.value 
:
""
    })
  }

  const mapCompetencesToDropdown = (competences: any): { value: string, label: string }[] => {
    if (!competences || !competences.competence) {
      return [];
    }

    return competences.competence.map((competence: any) => ({
      value: competence._id,
      label: `${competence.skill} : ${competence.level}`
    }));
  }

  const mapEducationToDropdown = (educations: any): { value: string, label: string }[] => {
    if (!educations || !educations.education) {
      return [];
    }

    return educations.education.map((education: any) => ({
      value: education._id,
      label: `${education.level} : ${education.field}`
    }));
  }

  const { data: educationData } = useQuery(gql`
  query Education {
    education{
      _id
      level
      field
        }
      }
  `);

const { data: competenceData } = useQuery(gql`
  query Competences {
    competence {
      _id
      skill
      level
    }
  }
`);

  return (
    <div className="register-page">
      {
        authState.loggedIn ? <Redirect to="/" /> : ''
      }
      <Card className="register-page-card">
        <MatchMeLogo className="register-page-card__logo" />
        <h1 className="register-page-card__title">Register</h1>
        <p className="register-page-card__subtitle">Create an account with Match Me</p>
        <form className="register-page-card__form" onSubmit={handleSubmit}>
          <Input value={state.email} onChange={handleInputChange} name="email" required type="email" label="Email Address" placeholder="username@email.com" />
          <Input value={state.password} onChange={handleInputChange} name="password" required type="password" label="Password" placeholder="******" />
          <Input value={state.profilePictureUrl} onChange={handleInputChange} name="profilePictureUrl" required type="text" label="Profile Picture Url" placeholder="http://image.com/example.png" />
          <p className="register-page-card__subtitle">Are you a Company posting jobs or looking for jobs?</p>
          <label>
            <input
              type="radio"
              name="react-tips"
              value="Company"
              checked={state.option === "Company"}
              onChange={handleRadioChange}
              className="form-check-input"
            />
            Company
          </label>
          <br></br>
          <label>
            <input
              type="radio"
              name="react-tips"
              value="Job Seeker"
              checked={state.option === "Job Seeker"}
              onChange={handleRadioChange}
              className="form-check-input"
            />
            Job Seeker
          </label>
          <br></br>
          <br></br>
          {
            state.option === "Company" ? (
              <div className="Company">
              <Input value={state.company} onChange={handleInputChange} name="company" required type="company" label="Company Name" placeholder="MatchMe" />
              <Input value={state.fname} onChange={handleInputChange} name="fname" required type="text" label="Your Name" placeholder="John Johnson" />
              <Input value={state.email_company} onChange={handleInputChange} name="email_company" required type="email_company" label="Company Email Address" placeholder="username@company.com" />
              <Input value={state.phone} onChange={handleInputChange} name="phone" required type="text" label="Company Phone number" placeholder="0459632145" />

              <br></br>
            <Button 
            className="form__button" 
            variant="primary" 
            type="submit">
            Register Company
          </Button>
              </div>
              
            ) : (
              <div>
          <div className="Job seeker">
          <Input value={state.fname} onChange={handleInputChange} name="fname" required type="text" label="Your Name" placeholder="John Johnson" />
          <Input value={state.phone} onChange={handleInputChange} name="phone" required type="text" label="Phone number" placeholder="0459632145" />
          <Input value={state.salary} onChange={handleInputChange} name="salary" required type="number" label="Desired Salary" placeholder="40000" />
          <Input value={state.location} onChange={handleInputChange} name="location" required type="location" label="Location" placeholder="Melbourne" />

         <br></br>
         <label>Select your skills</label>
          <Select
            label="Select your skills"
            isMulti
            name="competence"
            options={mapCompetencesToDropdown(competenceData)}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleskillChange}
          />
                   <br></br>
          <label>Select your education</label>
          <Select
            label="Select your education"
            isMulti
            name="education"
            options={mapEducationToDropdown(educationData)}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleeducationChange}

          />
                   <br></br>
         <label>Select your work type</label>
          <Select
            label="Select your work type"
            name="typeofwork"
            options={TYPE_OF_WORK_SELECT_OPTIONS}
            className="basic-single"
            classNamePrefix="select"
            onChange={handleworkChange}
          />
            <label>Select the Prioity of the fields(The total of these fields must equal 1)</label>
          <div className="Priorities1">
            <Input value={state.salary_p} onChange={handleInputChange}  name="salary_p" required type="salary_p" label="Salary Prioity" placeholder="0.20" />
            <Input value={state.education_p} onChange={handleInputChange} name="education_p" required type="education_p" label="Education Prioity" placeholder="0.20" />
            <Input value={state.location_p} onChange={handleInputChange} name="location_p" required type="location_p" label="Location Prioity" placeholder="0.20" />
            <Input value={state.competence_p} onChange={handleInputChange} name="competence_p" required type="competence" label="Competence Prioity" placeholder="0.20" />
            <Input value={state.typeofwork_p} onChange={handleInputChange} name="typeofwork_p" required type="typeofwork_p" label="Work Prioity" placeholder="0.20" />
          </div>
          <br></br>
            <Button 
            className="form__button" 
            variant="primary" 
            type="submit">
            Register
          </Button>
             </div>
             </div>
            )
          }

        </form>
        {
          createJobSeekerResult ? <div>User created successfully! </div> : ''
        }
      </Card>
    </div>
  )
}

export default pageWrapper(
  RegisterPage, 
  { 
    authorisedUserTypes: [
      EUserType.Unknown
    ] 
  }
);
