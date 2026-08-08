import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5'

const getCurrentWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => {
        return(response.data)
    })
}

// const getWeatherIcon = (id) => {
//     const request = axios.get(`${baseUrl})
// }

export default {getCurrentWeather}