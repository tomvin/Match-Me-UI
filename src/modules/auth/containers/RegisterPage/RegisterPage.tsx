import React, { useState, FormEvent } from 'react'
import Select from 'react-select';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import './RegisterPage.scss';
import Card from '../../../shared/components/Card/Card';
import MatchMeLogo from '../../../shared/components/MatchMeLogo/MatchMeLogo';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { login, IAuthenticationState, fetchUser, modifyLoginForm } from "../../../../redux/slices/authenticationSlice";
import { IAppState } from '../../../../redux/appState';
import { Redirect } from 'react-router-dom';
import { EUserType } from '../../../../models/UserType';
import { isFlowBaseAnnotation } from '@babel/types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';




interface RegisterPageState {
  email: string;
  password: string;
  company: string;
  fname: string;
  location: string;
  salary: string;
  phone: string;
  option: 'Job Seeker' | 'Company';
  competence: string[];
  education: string[];
  typeofwork: string;
  education_p: string;
  competence_p: string;
  salary_p: string;
  typeofwork_p: string;
  location_p: string;
  }

const RegisterPage = () => {
  const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);
  const [state, setState]: [RegisterPageState, any] = useState({
    attemptingLogin: false,
    email: '',
    password: '',
    company: "",
    fname: "",
    location: "",
    salary: "",
    phone: "",
    option: "Job Seeker",
    competence:[],
    education: [],
    typeofwork: '',
    education_p: '',
    competence_p: '',
    salary_p: '',
    typeofwork_p: '',
    location_p: ''
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  }

  const handleInputChange = ({target: {name, value}}: any) => {
    setState({
      ...state,
      [name]: value,
    });
    console.log(state)
  }
  const handleRadioChange = ({target: {checked, value}}: any) => {
  
  if(checked == true)
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

  const { loading: loadingEducation, error: errorLoadingEducation, data: educationData } = useQuery(gql`
  query {
education{
      _id
      level
      field
        }
      }
  `);

const { loading: loadingCompetence, error: errorLoadingCompetence, data: competenceData } = useQuery(gql`
  query AllCompetences {
    competence {
      _id
      skill
      level
    }
  }
`);


  const typeofwork = [
    { value: '1', label: 'Full Time' },
    { value: '2', label: 'Part Time' },
    { value: '3', label: 'Casual' },
    { value: '4', label: 'Full Time/Casual' },
    { value: '5', label: 'Part Time/Casual' },
    { value: '6', label: 'Full Time/Part Time' },
    { value: '7', label: 'Full Time/Part Time/Casual' },

  ];




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

          { authState.loginFailed ? <p className="color--red">{authState.loginFailureMessage}</p> : ''}
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
              </div>
            ) : (
              <div>
          <div className="Job seeker">
          <Input value={state.fname} onChange={handleInputChange} name="fname" required type="text" label="Your Name" placeholder="John Johnson" />
          <Input value={state.phone} onChange={handleInputChange} name="phone" required type="number" label="Your Phone number" placeholder="0459632145" />
          <Input value={state.salary} onChange={handleInputChange} name="salary" required type="salary" label="Desired Salary" placeholder="40000" />
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
            options={typeofwork}
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

             </div>
             </div>
            )
          }
          <br></br>
            <Button 
            className="form__button" 
            variant="primary" 
            type="submit">
            Register
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default pageWrapper(
  RegisterPage, 
  { 
    authorisedUserTypes: [
      EUserType.Unknown,
      EUserType.Company,
      EUserType.Admin,
      EUserType.JobSeeker

    ] 
  }
);
