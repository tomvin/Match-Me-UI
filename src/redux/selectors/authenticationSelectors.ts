import { EUserType } from './../../models/UserType';
import { IAuthenticationState } from './../slices/authenticationSlice';
import { createSelector } from 'reselect';
import { IAppState } from '../appState';
import { LoggedInUser } from '../../api/queries/checkUserQuery';

export const authenticationState = (state: IAppState): IAuthenticationState => state.authentication;
export const loggedInUserSelector = createSelector<IAppState, IAuthenticationState, LoggedInUser>(
  authenticationState,
  user => user.user as LoggedInUser
);
export const selectLoggedInUserType = createSelector<IAppState, IAuthenticationState, EUserType>(
  authenticationState,
  user => user.userType
);