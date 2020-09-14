import { ReminderModel } from 'app/models';
import { ReminderModalModel } from 'app/models/reminderModal';

export interface RootState {
  reminder: RootState.ReminderState;
  reminderModal: ReminderModalModel;
  router?: any;
}

export namespace RootState {
  export type ReminderState = { [monthYear: string]: ReminderModel[] };
  export type ReminderModalState = ReminderModalModel;
}
