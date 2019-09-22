import React, { useState, FormEvent } from 'react'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import './LoginPage.scss';
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

interface LoginPageState {
  email: string;
  password: string;
  showRegisterRedirect: boolean;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);
  const [state, setState]: [LoginPageState, any] = useState({
    attemptingLogin: false,
    email: 'jobSeeker@match.com',
    password: '',
    showRegisterRedirect: false

    
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
      [name]: value
    });
  }

  const handleRegisterClick = (): any => {
    dispatch(modifyLoginForm());
    setState({
      ...state,
      showRegisterRedirect: true
    });
  }

  return (
    <div className="login-page">
      {
        authState.loggedIn ? <Redirect to="/" /> : ''
      }
      {
        state.showRegisterRedirect ? <Redirect to="/register" /> : ''
      }
      <Card className="login-page-card">
        <MatchMeLogo className="login-page-card__logo" />
        <h1 className="login-page-card__title">Welcome back,</h1>
        <p className="login-page-card__subtitle">Sign in to continue using Match Me</p>
        <form className="login-page-card__form" onSubmit={handleSubmit}>
          <Input value={state.email} onChange={handleInputChange} name="email" required type="email" label="Email Address" placeholder="username@email.com" />
          <Input value={state.password} onChange={handleInputChange} name="password" required type="password" label="Password" placeholder="******" />
          { authState.loginFailed ? <p className="color--red">{authState.loginFailureMessage}</p> : ''}
          <Button 
            loading={authState.loggingIn} 
            className="form__button" 
            variant="primary" 
            type="submit">
            Login
          </Button>
          <Button 
            className="form__button"
            onClick={handleRegisterClick}
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
  LoginPage, 
  { 
    authorisedUserTypes: [
      EUserType.Unknown,
      EUserType.Company,
      EUserType.Admin,
      EUserType.JobSeeker
    ] 
  }
);
