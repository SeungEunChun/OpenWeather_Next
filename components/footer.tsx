"use client"

import { useState } from "react";

export default function Footer() {
    const [helper, setHelper] = useState(false)
    const handleClick = () => {
        document.body.classList.add("dim");
        setHelper((prevstate) => !prevstate);

    }

    return <>
        <div onClick={handleClick}>도움말</div>
        {
            helper && (
                <div className="helper">

                </div>
            )
        }
    </>
}