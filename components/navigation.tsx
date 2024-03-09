"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
export default function Navigation() {
    const path = usePathname();
    return <div>
        <ul id="Gnb">
            <li><Link href="/" className={path === "/" ? "activeLink" : ""}>Home</Link>{path === "/" ? "👣" : ""}</li>
            <li><Link href="/contact" className={path === "/contact" ? "activeLink" : ""}>Contact</Link>{path === "/contact" ? "👣" : ""}</li>
        </ul>
    </div>
}