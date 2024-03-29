import Navigation from "./navigation"
export default function Header() {
    return <header className="d-flex justify-content-between container">
        <h1 className="pt-3" id="Logo"><a href="/"><img src="https://i.ibb.co/zsdhJPS/weatherlogo.png" alt="weatherlog" /></a></h1>
        <Navigation />
    </header>
}