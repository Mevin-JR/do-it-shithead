import { LockKeyhole, Mail } from "lucide-react";
import Input from "../components/input";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { sendErrorToast } from "../utils/toast";
import {
  loginWithEmailAndPassword,
  parseAuthErrorMessage,
} from "../utils/auth";
import Loading from "../components/loading";
import { AUTH_PROVIDER_STATUS, AuthProvider } from "../configs/authConfig";
import { firstCharUpperCase } from "../utils/userData";
import { motion } from "motion/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const { user, loading } = useAuth();

  // FIXME: Choose either popup or redirect for google sign in
  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       if (result) {
  //         console.log("DEBUG: Google sign-in successful");
  //         sendSuccessToast(`Success! ${result.user.email}`) // DEBUG
  //       }
  //     })
  //     .catch((err) => {
  //       sendErrorToast(parseAuthErrorMessage(err));
  //       sendErrorToast(err) // DEBUG
  //     })
  //     .finally(() => console.log("Nothing happened"))
  // }, [auth]);

  if (loading) return <Loading />;
  if (user) return <Navigate to="/home" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      sendErrorToast("Invalid email or password");
      return;
    }

    try {
      setButtonLoading(true);
      await loginWithEmailAndPassword(email.trim(), password);
    } catch (err) {
      sendErrorToast(parseAuthErrorMessage(err));
    } finally {
      setButtonLoading(false);
    }
  };

  const handleSignInProvider = async (
    e: React.MouseEvent,
    provider: AuthProvider,
  ) => {
    e.preventDefault();

    if (!AUTH_PROVIDER_STATUS[provider].enabled) {
      sendErrorToast(
        `${firstCharUpperCase(provider)} sign-in has been disabled`,
      );
      return;
    }
    // FIXME: Implement google sign in (Both popup and redirect unavailable right now)
    // const provider = new GoogleAuthProvider();

    // try {
    //   setButtonLoading(true);
    //   await signInWithRedirect(auth, provider);
    //   console.log("Logged in user:");
    // } catch (err) {
    //   sendErrorToast(parseAuthErrorMessage(err));
    //   sendErrorToast("Error handling google login") // DEBUG
    // } finally {
    //   setButtonLoading(false);
    // }
  };

  return (
    // TODO: Use framer motion to animate the fade in effects of quotes and other elements
    <div className="relative min-h-screen flex items-center justify-center p-0 md:p-8">
      <div className="w-full max-w-6xl h-full md:h-175 flex overflow-hidden rounded-none md:rounded-xl shadow-2xl bg-white border border-solid border-[#233648]">
        {/* Left side (quote) */}
        <div
          className="hidden md:block relative w-1/2 p-12 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16, 25, 34, 0.7), rgba(16, 25, 34, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuApBLE8p8DAmyPFh-oqG8s41NfYlmb2It6lIevhV71Aj_alh8QkcfDSV23xIAL7_Zqd77rjFDsjpgYlI7XDOIktP2yf4_JEIzCa0PDUzFZOEMGf5m7iLLLpAiqdSBrxok25tBii5Mbom2C2c_YNu_1QAh8zPeFaNvm44EXJXn-7BknN5fI6e5COcRJGtlStnXoB_ReYgfygPUSBD-UYkTxGCVHdc9UDpVAXgNhcidiWoM5OR0ungNuaGiGKYbCzMLS3ICLv7JQe1oY",
          }}
        >
          <motion.div
            className="h-full flex flex-col justify-between"
            initial={{ opacity: 0.5, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="p-1 bg-primary-light text-black rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-tally5-icon lucide-tally-5"
                >
                  <path d="M4 4v16" />
                  <path d="M9 4v16" />
                  <path d="M14 4v16" />
                  <path d="M19 4v16" />
                  <path d="M22 6 2 18" />
                </svg>
              </div>
              <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                Do it, Shithead!
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <blockquote className="text-4xl italic font-bold leading-relaxed text-white">
                "The secret of getting ahead is getting started."
              </blockquote>
              <cite className="text-primary-light not-italic text-lg font-medium">
                - Mark Twain
              </cite>
            </div>
            <div className="text-gray-400 text-sm">
              <p>Choose your mentor. Build your momentum.</p>
            </div>
          </motion.div>
        </div>
        {/* Right side (form) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 bg-white">
          <motion.div
            className="max-w-100 w-full mx-auto"
            initial={{ opacity: 0.5, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-10">
              <h2 className="text-gray-900 text-3xl font-bold leading-tight tracking-[-0.015em]">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm">
                Sign in to continue your grind
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                autoComplete="email"
                icon={<Mail size={20} />}
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                autoComplete="current-password"
                icon={<LockKeyhole size={20} />}
              />
              <button
                type="submit"
                disabled={buttonLoading}
                className={`mt-4 flex min-w-21 w-full items-center justify-center overflow-hidden rounded-lg h-12 px-4 text-sm transition-colors duration-200 
                ${buttonLoading ? "bg-gray-400 text-gray-800 cursor-not-allowed" : "bg-primary-light hover:bg-primary-light-110 cursor-pointer"}`}
              >
                {buttonLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
            <div className="mt-5 text-center">
              <p className="text-gray-400 text-xs">
                Don't have an account?{" "}
                {buttonLoading ? (
                  <span className="text-primary-light font-semibold hover:underline cursor-not-allowed">
                    Sign up
                  </span>
                ) : (
                  <Link
                    to="/signup"
                    className="text-primary-light font-semibold hover:underline"
                  >
                    Sign Up
                  </Link>
                )}
              </p>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <span className="w-full border-t border-gray-400" />
              <div className="flex justify-center text-xs uppercase">
                <span className="px-2 text-gray-400">Or continue with</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={(e) => handleSignInProvider(e, "google")}
                  className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg border border-gray-400 bg-transparent text-gray-900 text-sm font-medium cursor-pointer hover:shadow-lg transition-shadow duration-200"
                >
                  <svg className="size-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button
                  onClick={(e) => handleSignInProvider(e, "github")}
                  className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg border border-gray-400 bg-transparent text-gray-900 text-sm font-medium cursor-pointer hover:shadow-lg transition-shadow duration-200"
                >
                  <svg
                    className="size-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                  </svg>
                  Github
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
