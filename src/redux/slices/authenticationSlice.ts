import { createSlice, PayloadAction } from 'redux-starter-kit';
import { IUser } from '../../models/User';
import { AppThunk } from '../configureStore';
import userApi from '../../api/userApi';

export interface IAuthenticationState {
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

interface ILoginFail {
  reasonForFailure: string;
}

interface ILoginSuccess {
  user: IUser;
}

export const fetchUser: AppThunk = (
  email: string, password: string
) => async (dispatch, state) => {
  try {
    const user: IUser | null = await userApi.login(email, password)

    if (!user) {
      dispatch(loginFail({ reasonForFailure: 'Invalid email address or password. ' }))
      return;
    } 

    dispatch(loginSuccess({user}));
  } catch (err) {
    console.error(err);
    dispatch(loginFail({ reasonForFailure: 'Error trying to login. ' }))
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
    },
    logout(state) {
      state.loggedIn = false;
      state.loggingIn = false;
      state.user = null;
      state.loginFailed = false;
      state.loginFailureMessage = null;
    }
  }
});

export const { login, loginSuccess, loginFail, logout, modifyLoginForm } = authenticationSlice.actions
export default authenticationSlice.reducer