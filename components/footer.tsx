"use client"

import { useEffect, useState } from "react"
import { willfix } from "../data/willfix"
export default function Footer() {

    const [show, setShow] = useState<Boolean>(false)
    const [help, setHelp] = useState<Boolean>(false)

    const handleClick = () => {
        setShow(prev => !prev)
    }
    const helpClick = () => {
        setHelp(prev => !prev)
    }

    useEffect(() => {
        setHelp(false)
    }, [show])

    return (<>
        <div className="d-flex justify-content-center mt-3 border-top container mb-3">
            <span className="d-block mt-3 helpbtn" onClick={handleClick}>도움말 보기</span>
        </div>
        {show && (<div className="helparea container">
            <strong>간편사용가이드</strong>
            <ul>
                <li>1 . 검색하고 싶은 도시명을 한국어로 입력해주세요</li>
                <li>2 . 한국 도시를 검색하고 싶으시다면, 우측 상단의 선택박스를 클릭하여 한국 날씨로 변경해 주세요.</li>
                <li>
                    <ul className="row">
                        <li>
                            <strong>불특정한 오류로 검색되지 않는 도시</strong><br />
                            <span>검색되지 않는 도시를 보려면?! <p className="d-block border" onClick={helpClick}>클릭</p></span>
                        </li>
                        {help && willfix.map((e, i) => {
                            return (
                                <li className="col-3" key={`cityname${i}`}>{e}</li>
                            )
                        })}
                    </ul>
                </li>

            </ul>
        </div>)}
    </>

    )
}