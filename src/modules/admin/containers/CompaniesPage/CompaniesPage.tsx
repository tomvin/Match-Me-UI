import React from 'react';
import pageWrapper from '../../../shared/components/PageWrapper/PageWrapper';
import { EUserType } from '../../../../models/UserType';
import { useQuery } from '@apollo/react-hooks';
import { AllCompaniesResult, ALL_COMPANIES } from '../../../../api/queries/allCompaniesQuery';
import { ICompany } from '../../../../models/Company';
import { ListItemVM } from '../../../shared/components/ListItem/ListItemModels';
import Loading from '../../../shared/components/Loading/Loading';
import Error from '../../../shared/components/Error/Error';
import List from '../../../shared/components/List/List';

const CompaniesPage = () => {
  const { loading, error, data } = useQuery<AllCompaniesResult, any>(ALL_COMPANIES);

  const mapCompaniesToListItems = (companies: ICompany[]): ListItemVM[] => companies.map<ListItemVM>(company => ({
    type: 'image',
    imageUrl: company.logoUrl,
    route: '',
    title: company.name,
    description: '',
    pillText: company.email,
    pillVariant: 'green',
    variant: 'primary'
  }));

  if (loading) return <Loading />
  if (error || !data || !data.companies) return <Error />

  return <List items={mapCompaniesToListItems(data.companies)}></List>
}

export default pageWrapper(CompaniesPage, { authorisedUserTypes: [ EUserType.Admin ] });