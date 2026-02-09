import "./app.css";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { initContextMenu } from "./utils/contextMenu";

export default function App() {
  useEffect(() => {
    // Initializing OS native context menu (right-click menu)
    initContextMenu();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Outlet />
      <Toaster />
    </main>
  );
}
