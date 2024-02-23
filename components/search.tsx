"use client"

import { useState } from 'react';

export default function Search() {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);







    const fetchWeather = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`);

        const data = await response.json();
        setWeather(data);


    };

    return (
        <div>
            <div className='d-flex flex-row-reverse '>
                <form onSubmit={fetchWeather} className='myform mt-3' >
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="도시 이름을 영어로 입력해 주세요"
                        required
                    />
                    <button className='btn py-0 mb-1 ms-3 mybtn' type="submit">검색</button>
                </form >
            </div>


            {weather && (
                <div className={`text-center mt-5 mb-5 searchresult mx-auto ${weather.weather[0].icon}`}>
                    <h2> {weather.name} 날씨 정보</h2>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weathericon" />

                    <p>기온 : {(weather.main.temp).toFixed(1)}°C</p>
                    <p>체감온도 : {(weather.main.feels_like).toFixed(1)}°C</p>
                    <p>상태 : {weather.weather[0].description}</p>
                    <p>풍속 : {(weather.wind.speed).toFixed(1)}m/s</p>


                </div>
            )
            }
        </div >
    );
}
