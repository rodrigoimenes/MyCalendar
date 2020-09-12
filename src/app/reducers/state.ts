import { ReminderModel } from 'app/models';

export interface RootState {
  reminder: RootState.ReminderState;
  router?: any;
}

export namespace RootState {
  export type ReminderState = { [monthYear: string]: ReminderModel[] };
}
