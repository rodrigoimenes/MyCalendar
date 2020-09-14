import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ReminderModalActions } from 'app/actions/reminderModal';


const initialState: RootState.ReminderModalState = {
    visible: false,
};

export const reminderModalReducer = handleActions<RootState.ReminderModalState, any>(
    {
        [ReminderModalActions.Type.NEW_REMINDER]: (state, _action) => {
            if (state.reminder) delete state.reminder
            return {
                ...state,
                visible: true,
            }
        },
        [ReminderModalActions.Type.EDIT_REMINDER_MODAL]: (state, action) => {
            return {
                ...state,
                visible: true,
                reminder: action.payload,
            }
        },
        [ReminderModalActions.Type.CLOSE_MODAL]: (state, _action) => {
            if (state.reminder) delete state.reminder
            return {
                ...state,
                visible: false,
            }
        },
    },
    initialState
);
