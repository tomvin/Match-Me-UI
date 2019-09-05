import React, { useState, FormEvent } from 'react'
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import './LoginPage.scss';
import Card from '../../components/Card/Card';
import MatchMeLogo from '../../components/MatchMeLogo/MatchMeLogo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { login, IAuthenticationState, fetchUser } from "../../redux/slices/authenticationSlice";
import { IAppState } from '../../redux/appState';
import { Redirect } from 'react-router-dom';

interface LoginPageState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);
  const [state, setState]: [LoginPageState, any] = useState({
    attemptingLogin: false,
    email: '',
    password: ''
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (authState.loggingIn) {
      return;
    }

    dispatch(
      login({
        email: state.email,
        password: state.password
      })
    );
    dispatch(fetchUser(state.email, state.password));
  }

  const handleInputChange = ({target: {name, value}}: any) => {
    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <div className="login-page">
      {
        authState.loggedIn ? <Redirect to="/matched-jobs" /> : ''
      }
      <Card className="login-page-card">
        <MatchMeLogo className="login-page-card__logo" />
        <h1 className="login-page-card__title">Welcome back,</h1>
        <p className="login-page-card__subtitle">Sign in to continue using Match Me</p>
        <form className="login-page-card__form" onSubmit={handleSubmit}>
          <Input value={state.email} onChange={handleInputChange} name="email" required type="email" label="Email Address" placeholder="username@email.com" />
          <Input value={state.password} onChange={handleInputChange} name="password" required type="password" label="Password" placeholder="******" />
          { authState.loginFailed ? <p>{authState.loginFailureMessage}</p> : ''}
          <Button 
            loading={authState.loggingIn} 
            className="form__button" 
            variant="primary" 
            type="submit">
            Login
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default pageWrapper(LoginPage);
