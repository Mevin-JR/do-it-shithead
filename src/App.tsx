import "./App.css";

import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import { useState } from "react";
import SignUp from "./components/signUp";

type AuthMode = "login" | "signup";

export default function App() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      {mode === "login" ? (
        <Login onSwitch={() => setMode("signup")} />
      ) : (
        <SignUp onSwitch={() => setMode("login")} />
      )}
      <Toaster />
    </main>
  );
}
