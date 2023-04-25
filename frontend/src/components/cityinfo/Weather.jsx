import React from 'react'
import '../../styles/weather.css'
import weather_icon from "../../Images/sunny-color.png"
const Weather = () => {
    return (
        <div className="weather-container">
            <div className="weather-icon">
                <img src={weather_icon} alt="sunny" />
            </div>
            <div className="weather-info">

                <div className="temperature">
                    <span className="current-temp">24°C</span>
                    <span className="description">Clear</span>
                </div>
                <div className="additional-info">
                    <span className="humidity">Humidity: 65%</span>
                    <span className="wind-speed">Wind: 10 km/h</span>
                </div>
            </div>
        </div>
    )
}

export default Weather