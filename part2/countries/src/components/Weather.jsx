import axios from "axios";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const buildUrl = (lat, lon, apiKey) => {
    return `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
}
const getImgUrl = (id) => {
    return `https://openweathermap.org/img/wn/${id}@2x.png`
}

const Weather = ({ city, lat, lon }) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        axios
            .get(buildUrl(lat, lon, apiKey))
            .then(response => setData(response.data));
    }, [lat, lon])

    if (!data) return
    return (
        <>
            <h2>Weather in {city}</h2>
            <p>Temperature {data.main.temp} Celsius</p>
            <img src={getImgUrl(data.weather[0].icon)} alt='weather icon' />
            <p>Wind {data.wind.speed} m/s</p>
        </>
    )
}

export default Weather;