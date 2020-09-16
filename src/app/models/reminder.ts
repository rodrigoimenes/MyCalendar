import { Forecast } from "app/services/getWeatherInfo";
import { Moment } from "moment";

export interface ReminderModel {
    id: string;
    name: string;
    date: Moment;
    city: string;
    month: string;
    year: string;
    color: string;
    weatherInfo?: Forecast
}

export namespace ReminderModel { }
