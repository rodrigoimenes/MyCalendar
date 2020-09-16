import axios from 'axios'
import { Moment } from 'moment'

export type Forecast = {
    date: string
    description: string
    min: number
    max: number
}

export type WeatherInfo = {
    city_name: string
    date: string
    description: string
    forecast: Forecast[]
    temp: string
}

const URL = 'https://api.hgbrasil.com/weather?'
// Not protected because is a really public key used only in frontend, the correct way is to create a backend to secure the connection
const KEY = 'cd812fca'
const FIELDS = 'only_results,temp,city_name,forecast,max,min,date,description'

export const getWeatherInfo = async (city: string, date: Moment) => {
    const response = await axios({
        method: 'get',
        url: `${URL}format=json-cors&locale=en&key=${KEY}&fields=${FIELDS}&city_name=${city}`,
        responseType: 'json'
    })

    const weatherInfo = response.data as WeatherInfo
    const dateFormatted = date.format('DD/MM')

    return weatherInfo.forecast.find(weatherDay => weatherDay.date === dateFormatted)
}