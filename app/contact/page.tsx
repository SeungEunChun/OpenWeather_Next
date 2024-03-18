import { Github, Instagram, Notion } from '../../assets/icon'
export const metadata = {
    title: "Contact"
}


export default function PageContact() {
    return <div className="container d-lg-flex justify-content-center">
        <div className="text-center">
            <figure className='mb-5'>
                <img src="https://i.ibb.co/r7ydKjg/profile2.png" alt="profile" className="img-fluid myprofile" />
            </figure>
            <figcaption>
                <i>안녕하세요, 개발자 <b>천승은</b> 입니다.</i>
            </figcaption>
        </div>
        <div>
            <ul className='contactlist d-lg-flex justify-content-between text-center'>
                <li className='icon'><a href="https://github.com/SeungEunChun" className='d-block mx-3' target='_blank'><Github /></a></li>
                <li className='icon'><a href="https://www.notion.so/OpenWeatherMap-API-3a2d3388718f41f0815b4e1c943468af" className='d-block mx-3' target='_blank'><Notion /></a></li>
                <li className='icon'><a href="https://www.instagram.com/dancer__ted?igsh=bG04cXBxdGQ2a3c2" className='d-block mx-3' target='_blank'><Instagram /></a></li>

            </ul>
            <ul className='contact ms-lg-5 ms-3 contactlist'>
                <li>Tel : <i>010-3084-6118</i></li>
                <li>E-Mail : <i>1000tmddms@gmail.com</i></li>

            </ul>
        </div>
    </div>
}