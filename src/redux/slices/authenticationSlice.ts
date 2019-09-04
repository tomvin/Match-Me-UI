import { createSlice, PayloadAction } from 'redux-starter-kit';
import { IUser } from '../../models/User';

interface IAuthenticationState {
  loggedIn: boolean;
  loggingIn: boolean;
  loginFailed: boolean;
  loginFailureMessage: string | null;
  user: IUser | null;
}

const initialState: IAuthenticationState = {
  loggedIn: false,
  loggingIn: false,
  loginFailed: false,
  loginFailureMessage: null,
  user: null
};

interface ILogin {
  email: string;
  password: string;
}

interface ILoginFail {
  reasonForFailure: string;
}

interface ILoginSuccess {
  user: IUser;
}

const authenticationSlice = createSlice({
  slice: 'authentication',
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILogin>) {
      state.loggingIn = true;
      state.loggedIn = false;
      state.user = null;
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
    }
  }
});

export const { login } = authenticationSlice.actions
export default authenticationSlice.reducer