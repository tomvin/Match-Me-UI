import React from 'react'
import pageWrapper from '../../components/PageWrapper/PageWrapper';
import './LoginPage.scss';
import Card from '../../components/Card/Card';
import MatchMeLogo from '../../components/MatchMeLogo/MatchMeLogo';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Card className="login-page-card">
        <MatchMeLogo className="login-page-card__logo" />
        
      </Card>
    </div>
  )
}

export default pageWrapper(LoginPage);
