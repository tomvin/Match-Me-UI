import { createSlice, PayloadAction } from 'redux-starter-kit';
import { EUserType } from '../../models/UserType';
import { LoggedInUser } from '../../api/queries/checkUserQuery';

export interface IAuthenticationState {
  loggedIn: boolean;
  user: LoggedInUser | null;
  userType: EUserType;
}

const initialState: IAuthenticationState = {
  loggedIn: false,
  user: null,
  userType: EUserType.Unknown
};

interface ILoginSuccess {
  user: LoggedInUser;
}

const authenticationSlice = createSlice({
  slice: 'authentication',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<ILoginSuccess>) {
      state.loggedIn = true;
      state.user = action.payload.user;
      state.userType = determineUserType(action.payload.user);
    }
  }
});

const determineUserType = (user: LoggedInUser | undefined): EUserType => {
  if (!user) {
    return EUserType.Unknown;
  }

  if (user.isCompany) {
    return EUserType.Company;
  }

  return EUserType.JobSeeker;
}

export const { loginSuccess } = authenticationSlice.actions
export default authenticationSlice.reducer