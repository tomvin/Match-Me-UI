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


interface RegisterPageState {
  email: string;
  password: string;
  company: string;
  fname: string;
  location: string;
  salary: string;
  phone: string;
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
    phone: ""
    

  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (authState.loggingIn) {
      return;
    }

    dispatch(login());
    dispatch(fetchUser(state.email, state.password));
  }

  const handleInputChange = ({target: {name, value}}: any) => {
    dispatch(modifyLoginForm());
    setState({
      ...state,
      [name]: value,
      selectedOption: null

    });
    handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    };
  }
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
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
              checked={true}
              className="form-check-input"
            />
            Company
          </label>
          <br></br>
          <label>
            <input
              type="radio"
              name="react-tips"
              value="jobSeeker"
              checked={true}
              className="form-check-input"
            />
            Job Seeker
          </label>
          <br></br>
          <br></br>
          <p className="register-page-card__subtitle">If the radio button is on Company</p>

          <Input value={state.company} onChange={handleInputChange} name="company" required type="company" label="Company Name" placeholder="MatchMe" />

          <p className="register-page-card__subtitle">If the radio button is on Job Seeker</p>

          <Input value={state.fname} onChange={handleInputChange} name="name" required type="name" label="Your Name" placeholder="" />
          <Input value={state.phone} onChange={handleInputChange} name="phone" required type="phone" label="Your Phone number" placeholder="" />
          <Input value={state.salary} onChange={handleInputChange} name="salary" required type="salary" label="Desired Salary" placeholder="" />
    

         



          
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
