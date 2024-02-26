"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useState, useEffect } from 'react'
import 'swiper/css'


const WeatherSwiper = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
    const cities = [
        "Nairobi", "New Delhi", "Nicosia", "Dhaka", "Dublin", "Dubai", "Lagos", "Lahore",
        "Reykjavik", "Los Angeles", "Luxembourg", "Ljubljana", "Riga", "Lima", "Lisbon",
        "Manila", "Madrid", "Marrakesh", "Montreal", "Mumbai",
        "Baghdad", "Warsaw", "Barcelona", "Bangkok", "Venice", "Berlin", "Belgrade", "Bogota",
        "Budapest", "Buenos Aires", "Bucharest", "Bratislava", "Brussels", "Vienna", "Vilnius",
        "Santiago", "São Paulo", "Shanghai", "San Francisco", "Saint Petersburg", "Sofia", "Stockholm",
        "Sydney", "Chicago", "Singapore", "Amsterdam", "Jerusalem", "Oslo", "Ottawa", "Johannesburg", "Wellington", "Istanbul", "Zagreb", "Jakarta", "Geneva", "Karachi",
        "Caracas", "Kabul", "Cairo", "Cape Town", "Copenhagen", "Kuala Lumpur", "Kyiv", "Tallinn",
        "Tehran", "Toronto", "Prague", "Frankfurt", "Hanoi", "The Hague", "Hong Kong"
    ];


    const [weather, setWeather] = useState([]);



    useEffect(() => {
        const FetchWeather = async () => {
            const cityshuffle = cities.sort(() => 0.5 - Math.random())
            const cityselect = cityshuffle.slice(0, 10)
            const data = await Promise.all(cityselect.map(city => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`).then(res => res.json())))
            setWeather(data);
        };

        FetchWeather();
    }, [apiKey])






    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,

            }}
            modules={[Autoplay]}
            loop={true}
            breakpoints={{
                992: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 2.5
                },
                576: {
                    slidesPerView: 2
                },
                405: {
                    slidesPerView: 1.2
                },
                0: {
                    slidesPerView: 1
                }
            }}
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