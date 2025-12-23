import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const navigation = useNavigate();

  return (
    <main>
      <h1>Welcome {auth.currentUser?.displayName}</h1>
      <button onClick={() => navigation("/")} className="border p-2">
        Back
      </button>
      <Toaster />
    </main>
  );
}
