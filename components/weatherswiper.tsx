"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useState, useEffect } from 'react'
import 'swiper/css'


const WeatherSwiper = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    const cities = ["Seoul",
        "Tokyo",
        "London",
        "Paris",
        "Beijing",
        "Athens",
        "Helsinki",
        "Moscow",
        "New York",
        "Rome"];

    const [weather, setWeather] = useState([]);



    useEffect(() => {
        const FetchWeather = async () => {
            const data = await Promise.all(cities.map(city => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`).then(res => res.json())))
            setWeather(data);
        };

        FetchWeather();
    }, [apiKey])






    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,

            }}
            modules={[Autoplay]}
            loop={true}
        >
            {
                weather.map((e, i) => {
                    return <SwiperSlide>
                        <div key={`city${i}`} className={`text-center mt-5 mb-5 searchresult mx-auto bg${e.weather[0].icon}`}>
                            <h2>{e.name}</h2>
                            <img src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt='weathericon' />
                            <p>기온 : {(e.main.temp).toFixed(1)}°C</p>
                            <p>체감온도 : {(e.main.temp).toFixed(1)}°C</p>
                            <p>상태 : {e.weather[0].description}</p>
                            <p>풍속 : {(e.wind.speed).toFixed(1)}m/s</p>
                        </div>
                    </SwiperSlide>
                })
            }
        </Swiper>
    )
}

export default WeatherSwiper;