import { ChangeEvent, MouseEvent, useState } from "react";
import {
  parseAuthErrorMessage,
  signUpWithEmailAndPassword,
} from "../utils/auth";
import { sendErrorToast, sendSuccessToast } from "../utils/toast";

type SignUpProps = {
  onSwitch: () => void;
};

export default function SignUp({ onSwitch }: SignUpProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

    if (!email || !password) {
      sendErrorToast("Invalid email or password.");
      return;
    }

    try {
      const user = await signUpWithEmailAndPassword(email, password);
      sendSuccessToast(`Signed Up using ${user.email}`);
      console.log(user);
    } catch (err) {
      sendErrorToast(parseAuthErrorMessage(err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5 rounded-lg shadow-[0_0_25px_10px_rgba(0,0,0,0.25)] bg-[#e9e9e9]">
      <h1>Sign Up</h1>
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
        <button onClick={onSwitch} className="underline cursor-pointer">
          Login
        </button>
      </p>
    </div>
  );
}
