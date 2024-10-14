import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { fontVie } from "@/config/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "S + TOOL",
  description: "BOT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={clsx("antialiased", fontVie.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
