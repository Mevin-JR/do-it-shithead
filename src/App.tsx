import "./App.css";

import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import { useEffect, useState } from "react";
import SignUp from "./components/signUp";
import Loading from "./components/loading";

type AuthMode = "login" | "signup";

export default function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("dark") : root.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleDark = () => {
    setDark((prev) => !prev); // FIXME: Fix this
  };

  return (
    <main className="relative w-screen h-screen flex items-center justify-center bg-white text-black dark:bg-[#121212] dark:text-white smooth-transition">
      {mode === "login" ? (
        <Login
          onSwitch={() => setMode("signup")}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <SignUp
          onSwitch={() => setMode("login")}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      <div className="absolute left-5 bottom-5 hover:animate-pulse-strong">
        <button
          onClick={toggleDark}
          className="relative p-3 rounded-full transition-colors duration-300 cursor-pointer"
        >
          <svg
            className={`h-8 w-8 text-black absolute inset-0 m-auto transition-all duration-700 ease-in-out ${
              dark
                ? "opacity-0 rotate-90 scale-50"
                : "opacity-100 rotate-0 scale-100"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>

          <svg
            className={`h-7 w-7 text-white absolute inset-0 m-auto transition-all duration-700 ease-in-out ${
              dark
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-50"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>

      {loading && <Loading />}
      <Toaster />
    </main>
  );
}
