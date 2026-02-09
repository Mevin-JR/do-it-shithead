import "./app.css";

import { Toaster } from "react-hot-toast";
// import Login from "./components/login";
import { useEffect, useState } from "react";
import SignUp from "./components/signUp";
import Loading from "./components/loading";
import { useAuth } from "./context/authContext";
import { Navigate } from "react-router-dom";
import { initContextMenu } from "./utils/contextMenu";
import Login from "./pages/login";

type AuthMode = "login" | "signup";

export default function App() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    // Initializing OS native context menu (right-click menu)
    initContextMenu();
  }, []);

  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) return <Navigate to="/home" replace />;

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
// <!DOCTYPE html>

// <html class="dark" lang="en"><head>
// <meta charset="utf-8"/>
// <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
// <title>TaskFlow - Login</title>
// <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&amp;display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
// <script id="tailwind-config">
//         tailwind.config = {
//             darkMode: "class",
//             theme: {
//                 extend: {
//                     colors: {
//                         "primary": "#2b8cee",
//                         "background-light": "#f6f7f8",
//                         "background-dark": "#101922",
//                     },
//                     fontFamily: {
//                         "display": ["Inter", "sans-serif"]
//                     },
//                     borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
//                 },
//             },
//         }
//     </script>
// <style>
//         .material-symbols-outlined {
//             font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
//         }
//     </style>
// </head>
// <body class="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-0 md:p-8">
// <div class="layout-container w-full max-w-6xl h-full md:h-[800px] flex overflow-hidden rounded-none md:rounded-xl shadow-2xl bg-white dark:bg-[#111a22] border border-solid border-[#233648]">
// <!-- Left Side: Illustration & Motivational Quote -->
// <div class="hidden md:flex w-1/2 relative flex-col justify-between p-12 bg-cover bg-center" data-alt="Calming minimalist productivity workspace with plant and laptop" style="background-image: linear-gradient(rgba(16, 25, 34, 0.7), rgba(16, 25, 34, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuApBLE8p8DAmyPFh-oqG8s41NfYlmb2It6lIevhV71Aj_alh8QkcfDSV23xIAL7_Zqd77rjFDsjpgYlI7XDOIktP2yf4_JEIzCa0PDUzFZOEMGf5m7iLLLpAiqdSBrxok25tBii5Mbom2C2c_YNu_1QAh8zPeFaNvm44EXJXn-7BknN5fI6e5COcRJGtlStnXoB_ReYgfygPUSBD-UYkTxGCVHdc9UDpVAXgNhcidiWoM5OR0ungNuaGiGKYbCzMLS3ICLv7JQe1oY');">
// <div class="flex items-center gap-2 text-white">
// <div class="size-8 text-primary">
// <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
// <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
// <path clip-rule="evenodd" d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764ZM4.95178 32.7688L21.4543 6.30267C22.6288 4.4191 25.3712 4.41909 26.5457 6.30267L43.0534 32.777C43.0709 32.8052 43.0878 32.8338 43.104 32.8629L41.3563 33.8352C43.104 32.8629 43.1038 32.8626 43.104 32.8629L43.1051 32.865L43.1065 32.8675L43.1101 32.8739L43.1199 32.8918C43.1276 32.906 43.1377 32.9246 43.1497 32.9473C43.1738 32.9925 43.2062 33.0545 43.244 33.1299C43.319 33.2792 43.4196 33.489 43.5217 33.7317C43.6901 34.1321 44 34.9311 44 35.7391C44 37.4427 43.003 38.7775 41.8558 39.7209C40.6947 40.6757 39.1354 41.4464 37.385 42.0552C33.8654 43.2794 29.133 44 24 44C18.867 44 14.1346 43.2794 10.615 42.0552C8.86463 41.4464 7.30529 40.6757 6.14419 39.7209C4.99695 38.7775 3.99999 37.4427 3.99999 35.7391C3.99999 34.8725 4.29264 34.0922 4.49321 33.6393C4.60375 33.3898 4.71348 33.1804 4.79687 33.0311C4.83898 32.9556 4.87547 32.8935 4.9035 32.8471C4.91754 32.8238 4.92954 32.8043 4.93916 32.7889L4.94662 32.777L4.95178 32.7688ZM35.9868 29.004L24 9.77997L12.0131 29.004C12.4661 28.8609 12.9179 28.7342 13.3617 28.6282C16.4281 27.8961 20.0901 27.4783 24 27.4783C27.9099 27.4783 31.5719 27.8961 34.6383 28.6282C35.082 28.7342 35.5339 28.8609 35.9868 29.004Z" fill="currentColor" fill-rule="evenodd"></path>
// </svg>
// </div>
// <h2 class="text-white text-2xl font-bold leading-tight tracking-[-0.015em]">TaskFlow</h2>
// </div>
// <div class="flex flex-col gap-4">
// <blockquote class="text-3xl font-light italic leading-relaxed text-white">
//                     "Focus on being productive instead of busy."
//                 </blockquote>
// <cite class="text-primary font-medium text-lg not-italic">— Tim Ferriss</cite>
// </div>
// <div class="text-white/60 text-sm">
//                 Join 10,000+ professionals mastering their day.
//             </div>
// </div>
// <!-- Right Side: Login Form -->
// <div class="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 bg-white dark:bg-[#111a22]">
// <div class="max-w-[400px] w-full mx-auto">
// <div class="mb-10">
// <h2 class="text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-2">Welcome Back</h2>
// <p class="text-[#92adc9] text-sm">Sign in to continue your progress.</p>
// </div>
// <form class="flex flex-col gap-4">
// <!-- Email Field -->
// <div class="flex flex-col gap-2">
// <label class="flex flex-col w-full">
// <p class="text-white text-sm font-medium leading-normal pb-1">Email address</p>
// <input class="form-input flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-[#324d67] bg-[#192633] focus:border-primary h-12 placeholder:text-[#92adc9] px-4 text-sm font-normal leading-normal" placeholder="name@company.com" value=""/>
// </label>
// </div>
// <!-- Password Field -->
// <div class="flex flex-col gap-2">
// <label class="flex flex-col w-full">
// <div class="flex justify-between items-center pb-1">
// <p class="text-white text-sm font-medium leading-normal">Password</p>
// <a class="text-primary text-xs hover:underline" href="#">Forgot password?</a>
// </div>
// <div class="flex w-full items-stretch rounded-lg">
// <input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none border-r-0 text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-[#324d67] h-12 placeholder:text-[#92adc9] px-4 text-sm font-normal leading-normal" placeholder="••••••••" type="password" value=""/>
// <div class="text-[#92adc9] flex border border-[#324d67] bg-[#192633] items-center justify-center px-3 rounded-r-lg border-l-0 cursor-pointer">
// <span class="material-symbols-outlined text-lg" data-icon="visibility">visibility</span>
// </div>
// </div>
// </label>
// </div>
// <button class="mt-4 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors" type="submit">
// <span class="truncate">Sign In</span>
// </button>
// </form>
// <div class="relative my-8">
// <div class="absolute inset-0 flex items-center">
// <span class="w-full border-t border-[#233648]"></span>
// </div>
// <div class="relative flex justify-center text-xs uppercase">
// <span class="bg-[#111a22] px-2 text-[#92adc9]">Or continue with</span>
// </div>
// </div>
// <div class="grid grid-cols-2 gap-4">
// <button class="flex items-center justify-center gap-2 h-11 rounded-lg border border-[#324d67] bg-transparent text-white text-sm font-medium hover:bg-[#192633] transition-colors">
// <svg class="size-5" viewbox="0 0 24 24">
// <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
// <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
// <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
// <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
// </svg>
//                         Google
//                     </button>
// <button class="flex items-center justify-center gap-2 h-11 rounded-lg border border-[#324d67] bg-transparent text-white text-sm font-medium hover:bg-[#192633] transition-colors">
// <svg class="size-5" fill="currentColor" viewbox="0 0 24 24">
// <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
// </svg>
//                         GitHub
//                     </button>
// </div>
// <div class="mt-10 text-center">
// <p class="text-[#92adc9] text-sm">
//                         Don't have an account?
//                         <a class="text-primary font-semibold hover:underline ml-1" href="#">Sign up for free</a>
// </p>
// </div>
// </div>
// <div class="mt-auto pt-8 flex justify-center gap-6">
// <a class="text-[#92adc9] text-xs hover:text-white transition-colors" href="#">Privacy Policy</a>
// <a class="text-[#92adc9] text-xs hover:text-white transition-colors" href="#">Terms of Service</a>
// <a class="text-[#92adc9] text-xs hover:text-white transition-colors" href="#">Contact Support</a>
// </div>
// </div>
// </div>
// </body></html>
