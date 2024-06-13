"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSolidMessage } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { GoSignIn } from "react-icons/go";
import { IoHome } from "react-icons/io5";
import { useSelector } from "react-redux";
import Avatar from "../avatar";
import Switch from "../ui/switch";
import style from "./burger.module.scss";

export default ({ open, setIsOpen }: { open: boolean; setIsOpen: any }) => {
  const state = useSelector((state: any) => state.auth);
  const [simpleMode, setSimpleMode] = useState(
    Cookies.get("_sm") === "true" ? true : false
  );
  const sidebarRef = useRef(null);
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const handleClick = (e: any) => {
    //@ts-ignore
    if (!sidebarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    console.log("switched to " + simpleMode);
    Cookies.set("_sm", simpleMode.toString());
    const body = document?.body;
    if (simpleMode) {
      body.className = "simple";
    } else body.className = "";
  }, [simpleMode]);

  return (
    <aside
      className={`${style.burger} ${open && style.active}`}
      onClick={handleClick}
    >
      <nav className={style.sidebar} ref={sidebarRef}>
        {state.isAuthenticated && (
          <Link href="/profile">
            <div className={style.profile}>
              <Avatar
                src={state.user?.avatar}
                width={100}
                height={100}
                alt="avatar"
              />
              <div className={style.data}>
                <p>{state.user.username}</p>
                <p>{state.user.email}</p>
              </div>
            </div>{" "}
          </Link>
        )}
        <ul>
          <li key={1}>
            <IoHome /> <Link href="/">На главную</Link>
          </li>
          {state.isAuthenticated ? (
            <li key={2}>
              <BsFillPersonFill />
              <Link href="/profile">Профиль</Link>
            </li>
          ) : (
            <li key={3}>
              <GoSignIn />
              <Link href="/auth">Вход</Link>
            </li>
          )}
          <li key={4}>
            <BiSolidMessage />
            <Link href="/chat">Чаты</Link>
          </li>
          <li key={5}>
            <Switch
              value={simpleMode}
              setValue={(e: any) => setSimpleMode(e)}
            />{" "}
            Живое оформление
          </li>
        </ul>
      </nav>
    </aside>
  );
};
