import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { ReminderModel } from 'app/models';

export namespace ReminderModalActions {
    export enum Type {
        NEW_REMINDER = 'NEW_REMINDER',
        EDIT_REMINDER_MODAL = 'EDIT_REMINDER_MODAL',
        CLOSE_MODAL = 'CLOSE_MODAL',
    }

    export const newReminder = createAction(Type.NEW_REMINDER);
    export const editReminder = createAction<ReminderModel>(Type.EDIT_REMINDER_MODAL);
    export const closeModal = createAction(Type.CLOSE_MODAL);
}

export type ReminderModalActions = Omit<typeof ReminderModalActions, 'Type'>;

export const useReminderModalActions = (dispatch: Dispatch) => {
    const { Type, ...actions } = ReminderModalActions;
    return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as ReminderModalActions;
};
