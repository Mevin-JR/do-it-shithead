import "./app.css";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Outlet, useLocation } from "react-router-dom";
import { initContextMenu } from "./utils/contextMenu";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Initializing OS native context menu (right-click menu)
    initContextMenu();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Toaster />
    </main>
  );
}
