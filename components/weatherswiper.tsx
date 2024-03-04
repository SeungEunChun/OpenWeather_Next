"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useState, useEffect, FC } from 'react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'

interface WeatherData {//이곳도 비동기를 직접적으로 요청하므로 데이터에 대한 TS 작성
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


const WeatherSwiper: FC = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string
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


    const [weather, setWeather] = useState<WeatherData[]>([]);



    useEffect(() => {
        const FetchWeather = async () => {
            const cityshuffle = cities.sort(() => 0.5 - Math.random())
            const cityselect = cityshuffle.slice(0, 8)
            const data: WeatherData[] = await Promise.all(cityselect.map(city => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=kr&units=metric`).then(res => res.json())))
            setWeather(data);
        };

        FetchWeather();
    }, [apiKey])






    return (
        <Swiper className='weatherswiper'
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}

            coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,

            }}


            modules={[Autoplay, EffectCoverflow]}
            loop={true}
            loopAdditionalSlides={0}
            breakpoints={{
                1650: {
                    slidesPerView: 6
                },
                1600: {
                    slidesPerView: 4
                },
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
                    slidesPerView: 1
                },
                0: {
                    slidesPerView: 1
                }
            }}
        >
            {
                weather.map((e, i) => {
                    return <SwiperSlide>
                        <div key={`city${i}`} className={`w-100 text-center searchresult bg${e.weather[0].icon} py-5`}>
                            <h2>{e.name} 날씨</h2>
                            <img src={`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} alt='weathericon' />
                            <strong>{(e.main.temp).toFixed(1)}°C</strong>
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