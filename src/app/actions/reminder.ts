import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { ReminderModel } from 'app/models';

export namespace ReminderActions {
    export enum Type {
        ADD_REMINDER = 'ADD_REMINDER',
        DELETE_REMINDER = 'DELETE_REMINDER',
        DELETE_ALL_FROM_DAY = 'DELETE_ALL_FROM_DAY',
        EDIT_REMINDER = 'EDIT_REMINDER',
    }

    export const addReminder = createAction<ReminderModel>(Type.ADD_REMINDER);
    export const editReminder = createAction<ReminderModel>(Type.EDIT_REMINDER);
    export const deleteReminder = createAction<ReminderModel['id']>(Type.DELETE_REMINDER);
    export const deleteAllFromDayReminder = createAction<{ monthYear: string, day: number }>(Type.DELETE_ALL_FROM_DAY);
}

export type ReminderActions = Omit<typeof ReminderActions, 'Type'>;

export const useReminderActions = (dispatch: Dispatch) => {
    const { Type, ...actions } = ReminderActions;
    return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as ReminderActions;
};
