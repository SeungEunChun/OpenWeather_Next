import Navigation from "./navigation"
export default function Header() {
    return <header className="d-flex justify-content-between">
        <h1 id="Logo"><a href="/"></a></h1>
        <Navigation />
    </header>
}