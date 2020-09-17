import { ReminderActions } from "app/actions"
import { createOrEdit } from "app/components/Reminder/createOrEdit"
import moment from 'moment'
import axios from 'axios'
import { reminderReducer } from "app/reducers/reminder";

jest.mock('axios');

describe('Create reminders', () => {
  it('should create a reminder', async () => {
    const date = moment('2020-09-16 23:00:00');

    const weatherInfoResponse = {
      city_name: 'Teresópolis',
      date: date.format('YYYY-MM-DD'),
      description: 'Night partly cloudy',
      forecast: [],
      temp: 16
    };

    axios.mockImplementationOnce(() => Promise.resolve({ data: weatherInfoResponse }));

    const reminder = {
      id: '1',
      name: 'Mocked tested',
      city: 'Teresópolis',
      color: '#FFF',
      date,
      month: (moment(date).month() + 1).toString(),
      year: moment(date).year().toString(),
    };

    const expected = await createOrEdit(reminder)

    expect(reminderReducer({}, {
      type: ReminderActions.Type.ADD_REMINDER, payload: expected
    })).toEqual({
      '9-2020': [reminder],
    });
  })
})