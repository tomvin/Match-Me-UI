import api from './api';
import { CHECK_USER_QUERY, CheckUserResult, CheckUserVariables } from './queries/checkUserQuery';

/**
 * Will verify the email and password is correct and if it is will return the 
 * corresponding `User`.
 * 
 * @param email 
 * @param password 
 */
const login = async (email: string, password: string): Promise<CheckUserResult> => {
  const lowerCaseEmail: string = email.toLowerCase();
  const result = await api.query<CheckUserResult, CheckUserVariables>({ query: CHECK_USER_QUERY, variables: { email: lowerCaseEmail, password } });
  return result.data;
};

export default {
  login
}