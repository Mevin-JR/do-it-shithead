import { auth } from "../firebase";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/home-components/navbar";
import { signOut } from "firebase/auth";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center p-5">
      <Navbar />
      <h1>Welcome {auth.currentUser?.displayName}</h1>
      <button onClick={() => signOut(auth)} className="border p-2">
        Sign Out
      </button>
      <Toaster />
    </main>
  );
}
