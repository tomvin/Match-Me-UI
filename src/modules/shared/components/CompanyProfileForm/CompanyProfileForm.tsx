import React, { useState } from 'react'
import './CompanyProfileForm.scss';
import Input from '../Input/Input';

interface Props {
  companyProfile?: CompanyProfile;
  formChangeCallback: (form: CompanyProfile) => any;
}

export interface CompanyProfile {
  logoUrl: string;
  name: string;
  email: string;
  phone: string;
}

const DEFAULT_COMPANY_PROFILE: CompanyProfile = {
  logoUrl: '',
  name: '',
  email: '',
  phone: ''
};

const CompanyProfileForm = ({companyProfile, formChangeCallback}: Props) => {
  const [form, setForm] = useState<CompanyProfile>( companyProfile ? companyProfile : DEFAULT_COMPANY_PROFILE);
  
  const handleInputChange = (event: any): void => {
    const newForm: CompanyProfile = {
      ...form,
      [event.target.name]: event.target.value,
    };
    
    setForm(newForm);
    formChangeCallback(newForm);
  }
  
  return (
    <div>
      <Input value={form.name} onChange={handleInputChange} name="name" required type="text" label="Company Name" placeholder="MatchMe" />
      <Input value={form.logoUrl} onChange={handleInputChange} name="logoUrl" required type="text" label="Company Logo URL" placeholder="http://<url-to-image>" />
      <Input value={form.email} onChange={handleInputChange} name="email" required type="email" label="Company Email Address" placeholder="username@company.com" />
      <Input value={form.phone} onChange={handleInputChange} name="phone" required type="text" label="Company Phone number" placeholder="0459632145" />
    </div>
  )
}

export default CompanyProfileForm
