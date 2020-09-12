import { combineReducers } from 'redux';
import { RootState } from './state';
import { reminderReducer } from './reminder';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  reminder: reminderReducer,
});
