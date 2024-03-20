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
        'Abu Dhabi',
        'Addis Ababa',
        'Algiers',
        'Amman',
        'Amsterdam',
        'Antananarivo',
        'Ashgabat',
        'Asmara',
        'Baghdad',
        'Baku',
        'Bandar Seri Begawan',
        'Bangkok',
        'Barcelona',
        'Beijing',
        'Beirut',
        'Belgrade',
        'Berlin',
        'Bishkek',
        'Bloemfontein',
        'Bogota',
        'Bratislava',
        'Brazzaville',
        'Brussels',
        'Bucharest',
        'Budapest',
        'Buenos Aires',
        'Bujumbura',
        'Cairo',
        'Cape Town',
        'Caracas',
        'Chicago',
        'Colombo',
        'Copenhagen',
        'Damascus',
        'Dhaka',
        'Dili',
        'Djibouti',
        'Dodoma',
        'Doha',
        'Dubai',
        'Dublin',
        'Dushanbe',
        'El Aaiún',
        'Frankfurt',
        'Gaborone',
        'Geneva',
        'Hanoi',
        'Harare',
        'Hong Kong',
        'Islamabad',
        'Istanbul',
        'Jakarta',
        'Jerusalem',
        'Johannesburg',
        'Juba',
        'Kabul',
        'Kampala',
        'Karachi',
        'Kathmandu',
        'Khartoum',
        'Kigali',
        'Kinshasa',
        'Kuala Lumpur',
        'Kuwait City',
        'Kyiv',
        'Lagos',
        'Lahore',
        'Libreville',
        'Lilongwe',
        'Lima',
        'Lisbon',
        'Ljubljana',
        'Los Angeles',
        'Luanda',
        'Lusaka',
        'Luxembourg',
        'Madrid',
        'Malé',
        'Manama',
        'Manila',
        'Maputo',
        'Marrakesh',
        'Maseru',
        'Mbabane',
        'Mogadishu',
        'Montreal',
        'Moroni',
        'Mumbai',
        'Muscat',
        'Nairobi',
        'Naypyidaw',
        'New Delhi',
        'Nicosia',
        'Nur-Sultan',
        'Oslo',
        'Ottawa',
        'Phnom Penh',
        'Port Louis',
        'Prague',
        'Pretoria',
        'Pyongyang',
        'Rabat',
        'Reykjavik',
        'Riga',
        'Riyadh',
        'Saint Petersburg',
        'San Francisco',
        'Sanaa',
        'Santiago',
        'Seoul',
        'Shanghai',
        'Singapore',
        'Sofia',
        'Stockholm',
        'Sydney',
        'São Paulo',
        'Taipei',
        'Tallinn',
        'Tashkent',
        'Tbilisi',
        'Tehran',
        'The Hague',
        'Thimphu',
        'Tokyo',
        'Toronto',
        'Tripoli',
        'Tunis',
        'Ulaanbaatar',
        'Venice',
        'Victoria',
        'Vienna',
        'Vientiane',
        'Vilnius',
        'Warsaw',
        'Wellington',
        'Windhoek',
        'Yerevan',
        'Zagreb'
    ];


    const [weather, setWeather] = useState<WeatherData[]>([]);



    useEffect(() => {
        const FetchWeather = async () => {
            const cityshuffle = cities.sort(() => 0.5 - Math.random())
            const cityselect = cityshuffle.slice(0, 12)
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
            slidesPerView={6}

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
                        <div key={`city${i + 1}`} className={`w-100 text-center searchresult bg${e.weather[0].icon} py-5`}>
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