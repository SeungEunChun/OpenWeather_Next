import Link from "next/link"

export default function Header() {
    return <header>
        <h1 id="Logo">
            <Link href="/"></Link>
        </h1>
        <hr />
    </header>
}