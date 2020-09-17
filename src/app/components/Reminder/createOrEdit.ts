import { ReminderModel } from "app/models"
import { getWeatherInfo } from "app/services/getWeatherInfo"

export const createOrEdit = async (reminder: ReminderModel) => {
  const weatherInfo = await getWeatherInfo(reminder.city, reminder.date)
  if (weatherInfo) reminder.weatherInfo = weatherInfo
  return reminder
}