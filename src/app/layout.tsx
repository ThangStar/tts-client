import "@/app/globals.css";
import type { Metadata } from "next";
import clsx from "clsx";
import { fontVie } from "@/config/fonts";
import { Providers } from "@/providers/providers";

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
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className={clsx("antialiased", fontVie.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
