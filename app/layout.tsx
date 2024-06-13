"use client";
import Burger from "@/components/burger/burger";
import Logo from "@/components/svg/logo";
import store from "@/lib/store/store";
import Link from "next/link";
import { useState } from "react";
import { Provider } from "react-redux";
import "./globals.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <html lang="en">
      <Provider store={store}>
        <body className="simple">
          <Burger open={burgerOpen} setIsOpen={setBurgerOpen} />
          <div
            className={`burger-icon ${burgerOpen && "open"}`}
            onClick={(e) => setBurgerOpen((prev) => !prev)}
          >
            <div className="burger-line top-line"></div>
            <div className="burger-line middle-line"></div>
            <div className="burger-line bottom-line"></div>
          </div>
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            href="/"
          >
            <Logo />
            <h1
              style={{
                fontSize: "26px",
                marginLeft: "10px",
                color: "linear-gradient(90deg, #ff8a00, #e52e71)",
                fontFamily: "'Poppins', sans-serif",
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                fontWeight: "bold",
                letterSpacing: "1px",
                background: "-webkit-linear-gradient(90deg, #ff8a00, #e52e71)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MOONetwork
            </h1>
          </Link>

          {children}
        </body>
      </Provider>
    </html>
  );
}
