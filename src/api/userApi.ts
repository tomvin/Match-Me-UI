import { gql } from 'apollo-boost';
import { IUser } from '../models/User';
import api from './api';

/**
 * MOCK login function as the backend doesn't actually support logging in
 * or even querying a single user currently. 
 * 
 * Will verify the email actually exists and if it does will return the 
 * corresponding `User`.
 * 
 * @param email 
 * @param password 
 */
const login = async (email: string, password: string): Promise<IUser | null> => {
  const query = gql`
  query Users {
    Users: users{
      _id
      email
      isCompany
      jobSeeker{
        _id
        name
        phone
        location
        typeofwork
        salary
        education_p
        competence_p
        location_p
        typeofwork_p
        salary_p
        competence {
          _id
        }
        education {
          _id
        }
      }
      company{
        _id
        name
      }
    }
  }
  `;
  const lowerCaseEmail: string = email.toLowerCase();
  const result = await api.query<{Users: IUser[]}>({ query });
  return result.data.Users.find(user => user.email.toLowerCase() === lowerCaseEmail) || null;
};

export default {
  login
}
