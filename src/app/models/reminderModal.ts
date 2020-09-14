import { ReminderModel } from "./reminder";

export interface ReminderModalModel {
    visible: boolean
    reminder?: ReminderModel
}

export namespace ReminderModalModel { }
