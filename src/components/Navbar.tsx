"use client";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { RiSunFill, RiMoonFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { get } from "http";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const getTheme = localStorage.getItem('theme')
    if(getTheme) setTheme(getTheme)
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);
  return (
    <nav className="bg-slate-900 flex justify-between items-center px-24 py-4 text-white">
      <Link href="/">
        <h1>Next Google</h1>
      </Link>
      {status === "authenticated" ? (
        <div className="flex gap-x-2 items-center">
          <Link href="/dashboard">Dashboard</Link>
          <p>{session.user?.name}</p>
          <img
            className="w-7 h-7 rounded-full cursor-pointer"
            src={session?.user?.image as string}
            alt="Image profile"
          />
          <button
            className="bg-red-500 hover:bg-red-800 hover px-3 py-2 rounded transition-all duration-200"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
          {theme === "dark" ? (
            <RiSunFill
              className="w-7 h-7 hover:text-zinc-700"
              onClick={() => {
                setTheme("ligth");
                localStorage.setItem("theme", "ligth");
              }}
            />
          ) : (
            <RiMoonFill
              className="w-7 h-7 hover:text-zinc-700"
              onClick={() => {
                setTheme("dark");
                localStorage.setItem("theme", "dark");
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-sky-400 px-3 py-2 rounded"
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
