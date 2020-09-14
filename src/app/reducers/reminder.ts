import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ReminderActions } from 'app/actions/reminder';
import moment from 'moment';

// TODO<BeforeDelivery>: Remember to remove this!!!! 
const initialState: RootState.ReminderState = {
  '9-2020': [{
    id: '1',
    name: 'teste',
    color: '#b80000',
    city: 'Teresopolis',
    date: moment(),
    month: '9',
    year: '2020',
  },
  {
    id: '2',
    name: 'teste 2',
    color: '#004dcf',
    city: 'Rio de Janeiro',
    date: moment().add(1, 'day'),
    month: '9',
    year: '2020',
  }]
};

export const reminderReducer = handleActions<RootState.ReminderState, any>(
  {
    [ReminderActions.Type.ADD_REMINDER]: (state, action) => {
      const monthYear = `${action.payload.month}-${action.payload.year}`
      const hasMonthYear = state[monthYear]

      if (hasMonthYear) {
        state[monthYear].push(action.payload)
        state[monthYear] = state[monthYear].sort((a, b) => a.date.valueOf() - b.date.valueOf())
      } else {
        state[monthYear] = [action.payload]
      }

      return state
    },
    [ReminderActions.Type.DELETE_REMINDER]: (state, action) => {
      for (const [monthYear, reminders] of Object.entries(state)) {
        if (reminders.length === 0) continue

        state[monthYear] = reminders.filter((rem) => rem.id !== action.payload)
      }
      return state
    },
    [ReminderActions.Type.DELETE_ALL_FROM_DAY]: (state, action) => {
      state[action.payload.monthYear] = state[action.payload.monthYear].filter((reminder) => reminder.date.date() !== action.payload.day)
      return state
    },
    [ReminderActions.Type.EDIT_REMINDER]: (state, action) => {
      const monthYear = `${action.payload.month}-${action.payload.year}`
      const idx = state[monthYear].findIndex((reminder) => reminder.id === action.payload.id)
      if (idx > -1) {
        state[monthYear][idx] = action.payload
        state[monthYear].sort((a, b) => a.date.valueOf() - b.date.valueOf())
      }

      return state
    },
  },
  initialState
);
