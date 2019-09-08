import { IAuthenticationState } from "./slices/authenticationSlice";

export interface IAppState {
  authentication: IAuthenticationState;
}