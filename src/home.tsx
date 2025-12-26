import { auth } from "../firebase";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/home-components/navbar";

export default function Home() {
  return (
    <main className="w-screen h-dvh grid grid-cols-[auto_1fr] p-5 box-border bg-white dark:bg-[#121212] text-black dark:text-white">
      <Navbar />
      <div>
        <h1>Welcome {auth.currentUser?.displayName}</h1>
      </div>

      <Toaster />
    </main>
  );
}
