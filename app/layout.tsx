import { Metadata } from "next"


import Header from "../components/header"
import Footer from "../components/footer"

import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata: Metadata = {
  title: {
    template: "%s | OpenWeather",
    default: "Devchun"
  },
  description: "OpenWeather Api generated by Devchun",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <>
          <Header />
          <section>
            {children}
          </section>
          <Footer />
        </>

      </body>
    </html>
  )
}
