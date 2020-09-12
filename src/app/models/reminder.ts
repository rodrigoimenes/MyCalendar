import { Moment } from "moment";

export interface ReminderModel {
    id: string;
    name: string;
    date: Moment;
    city: string;
    month: string;
    year: string;
    color: string;
}

export namespace ReminderModel { }
