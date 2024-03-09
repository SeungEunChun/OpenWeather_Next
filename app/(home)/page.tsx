import Search from "../../components/search";
import WeatherSwiper from "../../components/weatherswiper";
export const metadata = {
    title: "OpenWeatherAPI"
};


export default function MainPage() {


    return (
        <>
            <Search />
            <WeatherSwiper />
        </>
    )
}