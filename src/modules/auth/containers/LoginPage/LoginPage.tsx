import React, { useState, FormEvent } from 'react'
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import './LoginPage.scss';
import Card from '../../../shared/components/Card/Card';
import MatchMeLogo from '../../../shared/components/MatchMeLogo/MatchMeLogo';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { IAuthenticationState, loginSuccess } from "../../../../redux/slices/authenticationSlice";
import { IAppState } from '../../../../redux/appState';
import { Redirect } from 'react-router-dom';
import { EUserType } from '../../../../models/UserType';
import { useLazyQuery } from '@apollo/react-hooks';
import { CHECK_USER_QUERY, CheckUserResult, CheckUserVariables } from '../../../../api/queries/checkUserQuery';

interface LoginPageState {
  email: string;
  password: string;
  showRegisterRedirect: boolean;
}

const INITIAL_STATE: LoginPageState = {
  email: 'tom@email.com',
  password: '1234',
  showRegisterRedirect: false,
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const authState: IAuthenticationState = useSelector((state: IAppState) => state.authentication);
  const [state, setState]: [LoginPageState, any] = useState(INITIAL_STATE);
  const [attemptLogin, { loading: attemptingLogin, error: loginError, data: loginResult }] = useLazyQuery<CheckUserResult, CheckUserVariables>(CHECK_USER_QUERY, { fetchPolicy: 'network-only' });

  if (loginResult && loginResult.checkUser) {
    dispatch(loginSuccess({ user: loginResult.checkUser }));
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (attemptingLogin) {
      return;
    }

    attemptLogin({ variables: {email: state.email, password: state.password}});
  }

  const handleInputChange = ({target: {name, value}}: any) => {
    setState({
      ...state,
      [name]: value
    });
  }

  const handleRegisterClick = (): any => {
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
          { loginError ? <p className="color--red">Invalid email or password. </p> : ''}
          <div className="loginButton">
          <Button 
            loading={attemptingLogin} 
            className="form__button login" 
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
          </div>
        </form>
      </Card>

    </div>
  )
}

export default pageWrapper(
  LoginPage, 
  { 
    authorisedUserTypes: [
      EUserType.Unknown
    ] 
  }
);
