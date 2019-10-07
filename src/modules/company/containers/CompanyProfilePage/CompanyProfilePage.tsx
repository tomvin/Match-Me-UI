import React, { useState } from 'react'
import './CompanyProfilePage.scss';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import CompanyProfileForm, { CompanyProfile } from '../../../shared/components/CompanyProfileForm/CompanyProfileForm';
import { LoggedInUser } from '../../../../api/queries/checkUserQuery';
import { useSelector } from 'react-redux';
import { loggedInUserSelector } from '../../../../redux/selectors/authenticationSelectors';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CompaniesForCompanyProfileResult, ALL_COMPANIES_FOR_COMPANY_PROFILE } from '../../../../api/queries/allCompaniesForCompanyProfile';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import { UpdateCompanyResult, UpdateCompanyVariables, UPDATE_COMPANY } from '../../../../api/mutations/updateCompanyMutation';
import Button from '../../../shared/components/Button/Button';
import Card from '../../../shared/components/Card/Card';

const CompanyProfilePage = () => {
  const user: LoggedInUser = useSelector(loggedInUserSelector);
  const [ profile, setProfile ] = useState<CompanyProfile | null>(null);
  const { loading, error, data } = useQuery<CompaniesForCompanyProfileResult>(ALL_COMPANIES_FOR_COMPANY_PROFILE, { fetchPolicy: 'network-only' });
  const [ updateCompany, { data: updateResult, loading: saving } ] = useMutation<UpdateCompanyResult, UpdateCompanyVariables>(UPDATE_COMPANY);

  const canSaveChanges = (): boolean => {
    return profile !== null;
  }

  const handleCompanyFormChange = (profile: CompanyProfile): void => {
    setProfile(profile);
  }

  const handleUpdateProfile = (): void => {
    if (!profile) {
      return;
    }

    updateCompany({
      variables: {
        companyUserId: user._id,
        companyInput: profile
      }
    })
  }

  const getCompanyProfileFromData = (userCompanyId: string, result: CompaniesForCompanyProfileResult | undefined): CompanyProfile | undefined => {
    if (!result || !result.companiesForCompanyProfile) {
      return undefined;
    }

    const company = result.companiesForCompanyProfile.find(p => p._id === userCompanyId);

    if (!company) {
      return undefined;
    }

    return {
      logoUrl: company.logoUrl,
      name: company.name,
      email: company.email,
      phone: company.phone
    };
  }

  if (loading) return <Loading />
  if (error || !data || !user.company) return <Error />

  return (
    <div className="company-profile-page">
      <Card>
        <Button 
          icon="save" 
          loading={saving}
          disabled={!canSaveChanges()} 
          className="update-profile-button" 
          variant="primary"
          onClick={handleUpdateProfile}
        >
          { updateResult ? `Profile Updated` : `Update Profile` }
        </Button>
        <CompanyProfileForm
          formChangeCallback={handleCompanyFormChange}
          companyProfile={getCompanyProfileFromData(user.company._id, data)}
        />
      </Card>
    </div>
  )
}

export default pageWrapper(CompanyProfilePage, {
  authorisedUserTypes: [
    EUserType.Company,
    EUserType.Admin
  ]
});
