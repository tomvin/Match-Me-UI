import { createSlice, PayloadAction, createSelector } from 'redux-starter-kit';
import { IUser } from '../../models/User';
import { EUserType } from '../../models/UserType';
import { AppThunk } from '../configureStore';
import userApi from '../../api/userApi';
import { IAppState } from '../appState';
import { LoggedInUser, CheckUserResult } from '../../api/queries/checkUserQuery';

export interface IAuthenticationState {
  loggedIn: boolean;
  loggingIn: boolean;
  loginFailed: boolean;
  loginFailureMessage: string | null;
  user: LoggedInUser | null;
  userType: EUserType;
}

const initialState: IAuthenticationState = {
  loggedIn: false,
  loggingIn: false,
  loginFailed: false,
  loginFailureMessage: null,
  user: null,
  userType: EUserType.Unknown
};

interface ILoginFail {
  reasonForFailure: string;
}

interface ILoginSuccess {
  user: LoggedInUser;
}

export const fetchUser: AppThunk = (
  email: string, password: string
) => async (dispatch, state) => {
  try {
    const user: CheckUserResult = await userApi.login(email, password)

    if (!user || !user.checkUser) {
      dispatch(loginFail({ reasonForFailure: 'Invalid email address or password. ' }))
      return;
    } 

    dispatch(loginSuccess({ user: user.checkUser }));
  } catch (err) {
    console.error(err);
    dispatch(loginFail({ reasonForFailure: 'Invalid email address or password. ' }))
  }
};

const authenticationSlice = createSlice({
  slice: 'authentication',
  initialState,
  reducers: {
    modifyLoginForm(state) {
      state.loginFailed = false;
      state.loginFailureMessage = null;
    },
    login(state) {
      state.loggingIn = true;
      state.loggedIn = false;
      state.user = null;
      state.userType = EUserType.Unknown;
      state.loginFailed = false;
      state.loginFailureMessage = null;
    },
    loginFail(state, action: PayloadAction<ILoginFail>) {
      state.loggedIn = false;
      state.loggingIn = false;
      state.loginFailed = true;
      state.loginFailureMessage = action.payload.reasonForFailure;
    },
    loginSuccess(state, action: PayloadAction<ILoginSuccess>) {
      state.loggedIn = true;
      state.loggingIn = false;
      state.user = action.payload.user;
      state.userType = determineUserType(action.payload.user);
      console.log(state.userType);
    }
  }
});

const userWithNullSelector = (state: IAppState) => state.authentication.user;
export const userSelector = createSelector(
  [ userWithNullSelector ],
  (user: IUser) => user
);

const determineUserType = (user: LoggedInUser): EUserType => {
  if (!user) {
    return EUserType.Unknown;
  }

  if (user.isCompany) {
    return EUserType.Company;
  }

  return EUserType.JobSeeker;
}

export const { login, loginSuccess, loginFail, modifyLoginForm } = authenticationSlice.actions
export default authenticationSlice.reducer