"use client"
import React, { useState } from 'react';

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
const cityMap: { [key: string]: string } = { //각국의 수도 이름 배열
    "서울": "Seoul",
    "평양": "Pyongyang",
    "도쿄": "Tokyo",
    "베이징": "Beijing",
    "타이페이": "Taipei",
    "하노이": "Hanoi",
    "프놈펜": "Phnom Penh",
    "비엔티안": "Vientiane",
    "방콕": "Bangkok",
    "쿠알라룸푸르": "Kuala Lumpur",
    "딜리": "Dili",
    "자카르타": "Jakarta",
    "네피도": "Naypyidaw",
    "반다르스리브가완": "Bandar Seri Begawan",
    "싱가포르": "Singapore",
    "다카": "Dhaka",
    "뉴델리": "New Delhi",
    "카트만두": "Kathmandu",
    "팀푸": "Thimphu",
    "이슬라마바드": "Islamabad",
    "카불": "Kabul",
    "비슈케크": "Bishkek",
    "아슈하바트": "Ashgabat",
    "타슈켄트": "Tashkent",
    "누르순탄": "Nur-Sultan",
    "바쿠": "Baku",
    "트빌리시": "Tbilisi",
    "예레반": "Yerevan",
    "아부다비": "Abu Dhabi",
    "사나": "Sanaa",
    "무스카트": "Muscat",
    "리야드": "Riyadh",
    "도하": "Doha",
    "마나마": "Manama",
    "쿠웨이트시티": "Kuwait City",
    "바그다드": "Baghdad",
    "테헤란": "Tehran",
    "예루살렘": "Jerusalem",
    "암만": "Amman",
    "다마스쿠스": "Damascus",
    "콜롬보": "Colombo",
    "말레": "Malé",
    "울란바토르": "Ulaanbaatar",
    "마닐라": "Manila",
    "듀샌베": "Dushanbe",
    "베이루트": "Beirut",
    "라바트": "Rabat",
    "알아윤": "El Aaiún",
    "알제": "Algiers",
    "튀니스": "Tunis",
    "트리폴리": "Tripoli",
    "카이로": "Cairo",
    "카르툼": "Khartoum",
    "아스마라": "Asmara",
    "지부티": "Djibouti",
    "모가디슈": "Mogadishu",
    "아디스아바바": "Addis Ababa",
    "주바": "Juba",
    "카람팔라": "Kampala",
    "키갈리": "Kigali",
    "부주뷘디": "Bujumbura",
    "네이로비": "Nairobi",
    "도도마": "Dodoma",
    "빅토리아": "Victoria",
    "루사카": "Lusaka",
    "마푸토": "Maputo",
    "릴롱웨": "Lilongwe",
    "하라레": "Harare",
    "모로니": "Moroni",
    "안타나나리보": "Antananarivo",
    "포트루이스": "Port Louis",
    "미바네": "Mbabane",
    "프리토리아": "Pretoria",
    "케이프타운": "Cape Town",
    "블루프런틴": "Bloemfontein",
    "마세루": "Maseru",
    "윈트후크": "Windhoek",
    "가보로네": "Gaborone",
    "루안다": "Luanda",
    "킨샤사": "Kinshasa",
    "브라자빌": "Brazzaville",
    "리브르빌": "Libreville",
    "뉴욕": "NewYork"

};

export default function Search(): JSX.Element {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

    const [city, setCity] = useState<string>('');
    const [translate, setTranslate] = useState<string>(''); //사용자가 입력한 도시명을 받아들이고 영어 배열 찾아가는 state
    const [weather, setWeather] = useState<WeatherData | null>(null);

    const handleClick = () => {
        setWeather(null);
        document.body.classList.remove("dim")
    }

    const userTranslate = (e: React.ChangeEvent<HTMLInputElement>) => {// 사용자의 입력값을 기반으로 영어 도시명으로 변환하는 함수
        const lang_ko = e.target.value;
        const lang_en = cityMap[lang_ko] || "";
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
                alert("비동기 실패");
            }
        } else {
            alert("영어 변환 실패")
        }
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`);

        // const data: WeatherData = await response.json();
        // setWeather(data);
        // document.body.classList.add("dim");
    };

    return (
        <div>
            <div className='d-flex'>
                <form onSubmit={FetchWeather} className='' >
                    <input
                        type="text"
                        value={translate}
                        onChange={userTranslate}
                        placeholder="도시 이름!"
                        required
                    />
                    <button className='' type="submit">검색</button>
                </form>
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
                    <div className='closebtn' onClick={handleClick}>닫기</div>
                </div>

            )}
        </div>
    );
}
