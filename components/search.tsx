"use client"
import React, { useEffect, useState } from 'react';
import { worldcityMap, koreacityMap } from '../data/worldcityMap';
interface WeatherData { // 비동기 데이터 호출하고 데이터 받아들일때 ts
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
    const [translate, setTranslate] = useState<string>(''); //사용자가 입력한 도시명을 받아들이고 영어 배열 찾아가는 state
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [currentMap, setCurrentMap] = useState<{ [key: string]: string }>(worldcityMap);//select의 옵션값이 바뀜에 따라 대기하는 배열이 다르게 하기 위함.
    const [mapValue, setMapValue] = useState<string>("world"); //handleSelect안의 selectMap 상태에 따라 placeholder 텍스트를 바꾸기 위함.
    const handleClick = () => {
        setWeather(null);
        document.body.classList.remove("dim")
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectMap = e.target.value;
        setMapValue(selectMap); // select박스 value에 따라 위의 mapValue 값을 업데이트
        setCurrentMap(selectMap === "world" ? worldcityMap : koreacityMap);
        setTranslate('');


    }



    const userTranslate = (e: React.ChangeEvent<HTMLInputElement>) => {// 사용자의 입력값을 기반으로 영어 도시명으로 변환하는 함수

        const lang_ko = e.target.value;
        const lang_en = currentMap[lang_ko] || "";
        setTranslate(lang_ko);
        setCity(lang_en);
    }//e: React.ChangeEvent<HTMLInputElement>는 해당 함수를 리액트의 onChange를 담당하는 함수로 사용하겠다고 ts에게 알려주는것


    const FetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city) {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`)
            if (res.ok) {
                const data: WeatherData = await res.json();
                setWeather(data);
                document.body.classList.add("dim");
            } else {
                alert("데이터를 불러오는데에 실패하였습니다.");

            }
        } else {
            alert("번역에 실패하였습니다.")
        }
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`);

        // const data: WeatherData = await response.json();
        // setWeather(data);
        // document.body.classList.add("dim");
    };

    return (
        <div>

            <div className='d-md-flex container justify-content-end'>
                <form onSubmit={FetchWeather} className='searchForm' >
                    <input
                        type="text"
                        value={translate}
                        onChange={userTranslate}
                        placeholder={mapValue === "world" ? "해외 수도 입력" : "국내 도시 입력"}
                        required
                    />
                    <button className='' type="submit">검색</button>
                </form>
                <select name="location" id="location" onChange={handleSelect} className='ms-md-3 searchselect mt-3 mt-md-0'>
                    <option value="world">전세계 날씨</option>
                    <option value="korea">한국 날씨</option>
                </select>
            </div>

            {weather && (

                <div id='result' className={`w-100 text-center mt-5 mb-5 searchresult bg${weather.weather[0].icon}`}>
                    <h2> {translate} 날씨 정보</h2>
                    {/* 검색결과의 도시 이름은 한국어로 구현 */}
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weathericon" />
                    <p>기온 : {(weather.main.temp).toFixed(1)}°C</p>
                    <p>체감온도 : {(weather.main.feels_like).toFixed(1)}°C</p>
                    <p>상태 : {weather.weather[0].description}</p>
                    <p>풍속 : {(weather.wind.speed).toFixed(1)}m/s</p>
                    <div className='closebtn d-inline-block' onClick={handleClick}>닫기</div>
                </div>

            )}
        </div>
    );
}
