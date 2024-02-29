"use client"
import React, { useState } from 'react';

interface WeatherData {
    name: string;
    weather: [
        {
            icon: string;
            description: string;
        }
    ];
    main: {
        temp: number;
        feels_like: number;
    };
    wind: {
        speed: number;
    };
}

export default function Search(): JSX.Element {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handleClick = () => {
        setWeather(null);
    }

    const FetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`);

        const data: WeatherData = await response.json();
        setWeather(data);
        document.body.classList.add("dim");
    };

    return (
        <div>
            <div className='d-flex'>
                <form onSubmit={FetchWeather} className='' >
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="도시 이름을 영어로 입력해 주세요"
                        required
                    />
                    <button className='' type="submit">검색</button>
                </form>
            </div>
            {weather && (
                <div className='w-100 active zup'>
                    <div id='result' className={`w-100 text-center mt-5 mb-5 searchresult bg${weather.weather[0].icon}`}>
                        <h2> {weather.name} 날씨 정보</h2>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weathericon" />
                        <p>기온 : {(weather.main.temp).toFixed(1)}°C</p>
                        <p>체감온도 : {(weather.main.feels_like).toFixed(1)}°C</p>
                        <p>상태 : {weather.weather[0].description}</p>
                        <p>풍속 : {(weather.wind.speed).toFixed(1)}m/s</p>
                        <div onClick={handleClick}>닫기</div>
                    </div>
                </div>
            )}
        </div>
    );
}
