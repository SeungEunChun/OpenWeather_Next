import Search from "../../components/search";
import WeatherSwiper from "../../components/weatherswiper";
import Footer from '../../components/footer'
export const metadata = {
    title: "OpenWeatherAPI"
};


export default function MainPage() {


    return (
        <>
            <Search />
            <WeatherSwiper />
            <Footer />
        </>
    )
}