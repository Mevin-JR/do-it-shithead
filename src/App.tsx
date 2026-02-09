import "./app.css";

import { Toaster } from "react-hot-toast";
// import Login from "./components/login";
import { useEffect, useState } from "react";
import SignUp from "./components/signUp";
import Loading from "./components/loading";
import { useAuth } from "./context/authContext";
import { Navigate } from "react-router-dom";
import { initContextMenu } from "./utils/contextMenu";

export default function App() {
  useEffect(() => {
    // Initializing OS native context menu (right-click menu)
    initContextMenu();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-0 md:p-8">
      {/* TODO: Change this mess of a login setup, as mentioned in main.tsx */}
      {mode === "login" ? (
        <Login
        // onSwitch={() => setMode("signup")}
        // loading={pageLoading}
        // setLoading={setPageLoading}
        />
      ) : (
        <SignUp
          onSwitch={() => setMode("login")}
          loading={pageLoading}
          setLoading={setPageLoading}
        />
      )}

      {/* <div className="absolute left-5 bottom-5">
        <ThemeSwitcher />
      </div> */}

      {pageLoading && <Loading />}
      <Toaster />
    </main>
  );
}
