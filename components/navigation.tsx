"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
export default function Navigation() {
    const path = usePathname();
    return <div>
        <ul id="Gnb">
            <li><Link href="/">Home</Link>{path === "/" ? "👣" : ""}</li>
            <li><Link href="/contact">Contact</Link>{path === "/contact" ? "👣" : ""}</li>
        </ul>
    </div>
}