import "./app.css";

import { Toaster } from "react-hot-toast";
import Login from "./components/login";
import { useEffect, useState } from "react";
import SignUp from "./components/signUp";
import Loading from "./components/loading";
import ThemeSwitcher from "./components/themeSwitcher";
import { useAuth } from "./context/authContext";
import { Navigate } from "react-router-dom";
import { initContextMenu } from "./utils/contextMenu";

type AuthMode = "login" | "signup";

export default function App() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    // Initializing OS native context menu (right-click menu)
    initContextMenu();
  }, []);

  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) return <Navigate to="/home" replace />;

  return (
    <main className="relative w-screen h-screen flex items-center justify-center bg-white text-black dark:bg-[#121212] dark:text-white smooth-transition">
      {/* TODO: Change this mess of a login setup, as mentioned in main.tsx */}
      {mode === "login" ? (
        <Login
          onSwitch={() => setMode("signup")}
          loading={pageLoading}
          setLoading={setPageLoading}
        />
      ) : (
        <SignUp
          onSwitch={() => setMode("login")}
          loading={pageLoading}
          setLoading={setPageLoading}
        />
      )}

      <div className="absolute left-5 bottom-5">
        <ThemeSwitcher />
      </div>

      {pageLoading && <Loading />}
      <Toaster />
    </main>
  );
}
