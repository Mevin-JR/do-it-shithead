import "./app.css";

import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import { useState } from "react";
import SignUp from "./components/signUp";
import Loading from "./components/loading";
import ThemeSwitcher from "./components/themeSwitcher";

type AuthMode = "login" | "signup";

export default function App() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState<boolean>(false);

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

      <div className="absolute left-5 bottom-5">
        <ThemeSwitcher />
      </div>

      {loading && <Loading />}
      <Toaster />
    </main>
  );
}
