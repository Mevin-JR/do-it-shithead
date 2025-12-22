import { ChangeEvent, MouseEvent, useState } from "react";
import {
  parseAuthErrorMessage,
  signUpWithEmailAndPassword,
} from "../utils/auth";
import { sendErrorToast, sendSuccessToast } from "../utils/toast";

type SignUpProps = {
  onSwitch: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignUp({ onSwitch, loading, setLoading }: SignUpProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSignUpAttempt = async (
    e: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!username || !email || !password) {
      sendErrorToast("Invalid details, please check your input");
      return;
    }

    try {
      setLoading(true);

      const user = await signUpWithEmailAndPassword(username, email, password);
      sendSuccessToast(`Signed up as ${username}`);
      console.log(user);
    } catch (err) {
      sendErrorToast(parseAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 rounded-lg bg-[#e9e9e9] dark:bg-[#212121] shadow-[0_0_25px_10px_rgba(0,0,0,0.25)] dark:shadow-[0_0_10px_5px_rgba(255,255,255,0.15)] smooth-transition">
      <h1>Sign Up</h1>
      <input
        name="Username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        className="outline-none border p-2 rounded"
      />
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
        onClick={handleSignUpAttempt}
        className="border px-2 cursor-pointer"
      >
        Sign Up
      </button>
      <p>
        Already a user?{" "}
        <button
          onClick={onSwitch}
          disabled={loading}
          className="underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </p>
    </div>
  );
}
