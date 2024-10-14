import { Fira_Code as FontMono, Inter as FontSans, Chakra_Petch } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontVie = Chakra_Petch({weight: "400", subsets: ['vietnamese'],variable: '--vie-font'})
