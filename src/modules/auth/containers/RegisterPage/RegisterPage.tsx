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

  }

const RegisterPage = () => {
  const dispatch = useDispatch();
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
    typeofwork: ''


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


 const Skills = [];
  //const Education = [];
  const educationArray = [useQuery(gql`
  query {
education{
      _id
      level
      field
        }
      }
  `)];

const CompetenceArray = useQuery(gql`
query {
competence{
    _id
    skill
    level
      }
    }
`);
console.log(CompetenceArray.data.competence)

for (var i = 0; i < CompetenceArray.data.length; ++i )
{
  console.log(CompetenceArray.data.competence[i].skill)
} 
/*for (var i = 0; i < CompetenceArray.data.competence; ++i) {

  var value = CompetenceArray.data.competence[i]._id
  var label = CompetenceArray.data.competence[i].skill + " : " + CompetenceArray.data.competence[i].level
  Skills.push({value: value, label: label})
}
console.log(Skills)
/*for (var i = 0; i < educationArray.data.education.length; ++i) {
  var value = educationArray.data.education[i]._id
  var label = educationArray.data.education[i].level + " : " + educationArray.data.education[i].field
  Education.push({value: value, label: label})
  }*/
  

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
         <br></br>
         <label>Select your skills</label>
          <Select
            label="Select your skills"
            isMulti
            name="competence"
            options={typeofwork}
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
            options={typeofwork}
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
             </div>
             </div>
            )
          }

            <Button 
            loading={authState.loggingIn} 
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
