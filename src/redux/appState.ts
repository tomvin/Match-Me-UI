import { IAuthenticationState } from "./slices/authenticationSlice";
import { IJobSeekerMatchesState } from "./slices/jobSeekerMatchesSlice";
import { createAction } from "redux-starter-kit";

export interface IAppState {
  authentication: IAuthenticationState;
  jobSeekerMatches: IJobSeekerMatchesState;
}

export const resetState = createAction('STATE_RESET');