import "./globals.css";

import type { Metadata } from "next";
import { ReactLenis as Lenis } from "lenis/react";

import { Viaoda_Libre as ViaodaLibre } from "next/font/google";

const _01 = ViaodaLibre({
  weight: "400",
  variable: "--font-vl",
  subsets: ["latin"],
})

const fonts = [_01]

export const metadata: Metadata = {
  title: "padé",
  description: "atjeh paddy productions (2018-2023)",
}

export default ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <Lenis root>
        <body
          className={`${fonts.map((f) => f.variable).join(" ")} max-w-[920px] mx-auto my-15 py-5 px-7.5 antialiased`}
        >
          {children}
        </body>
      </Lenis>
    </html>
  )
}
