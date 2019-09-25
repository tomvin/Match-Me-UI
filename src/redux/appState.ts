import { IAuthenticationState } from "./slices/authenticationSlice";
import { createAction } from "redux-starter-kit";

export interface IAppState {
  authentication: IAuthenticationState;
}

export const resetState = createAction('STATE_RESET');