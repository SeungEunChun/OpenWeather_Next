"use client"

import { useState } from 'react';

export default function Home() {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const fetchWeather = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = await response.json();
        setWeather(data);
    };

    return (
        <div>
            <form onSubmit={fetchWeather}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="도시 이름을 영어로 입력해 주세요"
                    style={{ width: "250px" }} required />
                <button type="submit">검색</button>
            </form>

            {weather && (
                <div>
                    <h1> {weather.name} 날씨 정보</h1>
                    <p>기온: {(weather.main.temp - 273).toFixed(1)}°C</p>
                    <p>상태: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}
