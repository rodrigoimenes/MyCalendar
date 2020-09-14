import { combineReducers } from 'redux';
import { RootState } from './state';
import { reminderReducer } from './reminder';
import { reminderModalReducer } from './reminderModal';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  reminder: reminderReducer,
  reminderModal: reminderModalReducer,
});
