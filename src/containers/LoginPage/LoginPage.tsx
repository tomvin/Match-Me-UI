import React, { useState } from 'react'
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import './LoginPage.scss';
import Card from '../../components/Card/Card';
import MatchMeLogo from '../../components/MatchMeLogo/MatchMeLogo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

interface LoginPageState {
  attemptingLogin: boolean;
}

const LoginPage = () => {
  const [state, setState]: [LoginPageState, any] = useState({
    attemptingLogin: false
  });

  const handleButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    setState({ attemptingLogin: true });
    console.log('TODO: Handle login. ');
  }

  return (
    <div className="login-page">
      <Card className="login-page-card">
        <MatchMeLogo className="login-page-card__logo" />
        <h1 className="login-page-card__title">Welcome back,</h1>
        <p className="login-page-card__subtitle">Sign in to continue using Match Me</p>
        <form className="login-page-card__form">
          <Input required type="email" label="Email Address" placeholder="username@email.com" />
          <Input required type="password" label="Password" placeholder="******" />
          <Button 
            loading={state.attemptingLogin}
            onClick={handleButtonClick} 
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
