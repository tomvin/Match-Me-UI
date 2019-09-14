import { IAppState } from "./appState";

const STATE_LOCAL_STORAGE_KEY = 'match-me-state';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE_LOCAL_STORAGE_KEY);
    if (serializedState === null) {
        return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const saveState = (state: IAppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_LOCAL_STORAGE_KEY, serializedState);
  } catch { 
    console.error('Error saving state to local storage. ');
  }
};

export const clearState = () => {
  try {
    localStorage.removeItem(STATE_LOCAL_STORAGE_KEY);
  } catch { 
    console.error('Error clearing local storage state. ');
  }
}

export default { loadState, saveState, clearState }