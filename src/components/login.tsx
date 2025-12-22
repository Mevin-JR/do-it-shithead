import { ChangeEvent, MouseEvent, useState } from "react";
import {
  loginWithEmailAndPassword,
  parseAuthErrorMessage,
} from "../utils/auth";
import { sendErrorToast, sendSuccessToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onSwitch: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ onSwitch, loading, setLoading }: LoginProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleLoginAttempt = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!email || !password) {
      sendErrorToast("Email & password cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const user = await loginWithEmailAndPassword(email, password);
      sendSuccessToast(`Logged in as ${user.displayName}`); // DEBUG

      navigate("/home", { replace: true });
    } catch (err) {
      sendErrorToast(parseAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 rounded-lg bg-[#e9e9e9] dark:bg-[#212121] shadow-[0_0_25px_10px_rgba(0,0,0,0.25)] dark:shadow-[0_0_10px_5px_rgba(255,255,255,0.15)] smooth-transition">
      <h1>Login</h1>
      <input
        name="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        className="outline-none border p-2 rounded"
      />
      <input
        name="pass"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="outline-none border p-2 rounded"
      />
      <button
        onClick={handleLoginAttempt}
        className="border px-2 cursor-pointer"
      >
        Login
      </button>
      <p>
        New user?{" "}
        <button
          onClick={onSwitch}
          disabled={loading}
          className="underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
