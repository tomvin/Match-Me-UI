import { IAuthenticationState } from "./slices/authenticationSlice";
import { IJobSeekerMatchesState } from "./slices/jobSeekerMatchesSlice";

export interface IAppState {
  authentication: IAuthenticationState;
  jobSeekerMatches: IJobSeekerMatchesState;
}