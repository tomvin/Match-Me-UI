import { createSlice, PayloadAction } from 'redux-starter-kit';
import { AppThunk } from '../configureStore';
import { IJob } from '../../models/Job';
import jobSeekerApi from '../../api/jobSeekerApi';

export interface IJobSeekerMatchesState {
  matches: IJob[] | undefined;
  loadingMatches: boolean;
  loadingFailed: boolean;
  loadingFailureMessage: string | undefined;
}

const initialState: IJobSeekerMatchesState = {
  matches: undefined,
  loadingMatches: false,
  loadingFailed: false,
  loadingFailureMessage: undefined
};

interface ILoadJobSeekerMatchesSuccess {
  matches: IJob[];
}

interface ILoadJobSeekerMatchesFail {
  reasonForFailure: string;
}

export const fetchJobSeekerMatchOverviews: AppThunk = (
  userId: string
) => async (dispatch, state) => {
  try {
    const matches: IJob[] | null = await jobSeekerApi.getJobSeekerMatchOverviews(userId)

    if (!matches) {
      dispatch(loadJobSeekerMatchesFail({ reasonForFailure: 'Failed to load your matches. ' }))
      return;
    } 

    dispatch(loadJobSeekerMatchesSuccess({matches: matches}));
  } catch (err) {
    console.error(err);
    dispatch(loadJobSeekerMatchesFail({ reasonForFailure: 'Failed to load your matches. ' }))
  }
};

const jobSeekerMatchesSlice = createSlice({
  slice: 'jobSeekerMatches',
  initialState,
  reducers: {
    loadJobSeekerMatches(state) {
      state.loadingFailed = false;
      state.loadingFailureMessage = undefined;
      state.loadingMatches = true;
    },
    loadJobSeekerMatchesSuccess(state, action: PayloadAction<ILoadJobSeekerMatchesSuccess>) {
      state.loadingMatches = false;
      state.loadingFailureMessage = undefined;
      state.loadingFailed = false;
      state.matches = action.payload.matches;
    },
    loadJobSeekerMatchesFail(state, action: PayloadAction<ILoadJobSeekerMatchesFail>) {
      state.loadingMatches = false;
      state.loadingFailureMessage = action.payload.reasonForFailure;
      state.loadingFailed = true;
    }
  }
});

export const { loadJobSeekerMatches, loadJobSeekerMatchesSuccess, loadJobSeekerMatchesFail } = jobSeekerMatchesSlice.actions
export default jobSeekerMatchesSlice.reducer