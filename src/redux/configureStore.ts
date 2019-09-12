import { configureStore, getDefaultMiddleware, ActionCreator, Action } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';
import initialState from './initialState';
import { loadState, saveState} from './localStorage';
import { IAppState } from './appState';
import { ThunkAction } from 'redux-thunk';
import { throttle } from 'lodash';
import authentication from './slices/authenticationSlice';
import jobSeekerMatches from './slices/jobSeekerMatchesSlice';

export type AppThunk = ActionCreator<ThunkAction<void, IAppState, null, Action<string>>>;

const persistedState = loadState();

const store = configureStore<IAppState>({
    reducer: {
        authentication,
        jobSeekerMatches 
    },
    middleware: [...getDefaultMiddleware(), logger],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: (persistedState || initialState),
    enhancers: [reduxBatch]
})

// Store current state to local storage. 
store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;