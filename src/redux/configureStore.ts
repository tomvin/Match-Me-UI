import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';
import initialState from './initialState';
import reducer from './slices/authenticationSlice';
import { throttle } from 'lodash';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = configureStore({
    reducer: {
        todos: reducer,
    },
    middleware: [...getDefaultMiddleware(), logger],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: (persistedState || initialState),
    enhancers: [reduxBatch]
})

store.subscribe(throttle(() => saveState(store.getState()), 1000));

export default store;