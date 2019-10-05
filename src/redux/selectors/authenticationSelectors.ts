import { createSelector } from 'reselect'
import { IAppState } from '../appState'
import { IAuthenticationState } from '../slices/authenticationSlice';
import { LoggedInUser } from '../../api/queries/checkUserQuery';

export const authenticationState = (state: IAppState): IAuthenticationState => state.authentication;
export const loggedInUserSelector = createSelector<IAppState, IAuthenticationState, LoggedInUser>(
  authenticationState,
  user => user.user as LoggedInUser
);
