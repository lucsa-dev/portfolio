'use client';
import localFont from "next/font/local";
import "./globals.css";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    if (cursor) {
      document.addEventListener("mousemove", (event) => {
        cursor.style.left = `${event.pageX}px`;
        cursor.style.top = `${event.pageY}px`;
      });

      const links = document.querySelectorAll("a");
      links.forEach(link => {
        link.addEventListener("mouseenter", () => {
          cursor.classList.remove("cursor-default");
          cursor.classList.add("cursor-hover");
        });

        link.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-hover");
          cursor.classList.add("cursor-default");
        });
      });
      return () => {
        document.removeEventListener("mousemove", () => {});
        links.forEach(link => {
          link.removeEventListener("mouseenter", () => {});
          link.removeEventListener("mouseleave", () => {});
        });
      };
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div
          id="custom-cursor"
          className="custom-cursor cursor-default" // Inicializa com a classe padrão
        />
      </body>
    </html>
  );
}
