import { signOut } from "firebase/auth";
import {
  ArrowLeftFromLine,
  CalendarDays,
  ListTodo,
  Search,
  CalendarArrowUp,
  Plus,
  SlidersHorizontal,
  LogOut,
} from "lucide-react";
import { auth } from "../../../firebase";
import { useEffect, useState } from "react";
import { getUserData, UserData } from "../../utils/auth";
import { sendErrorToast } from "../../utils/toast";
import { useAuth } from "../../context/authContext";
import { censorEmail } from "../../utils/userData";

export type Tab =
  | (typeof tasksNavItems)[number]["id"]
  | (typeof listsNavItems)[number]["id"];

type NavbarProps = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

const tasksNavItems = [
  { id: "upcoming", name: "Upcoming", icon: CalendarArrowUp },
  { id: "today", name: "Today", icon: ListTodo },
  { id: "calendar", name: "Calendar", icon: CalendarDays },
] as const;

const listsNavItems = [
  { id: "personal", name: "Personal", iconColour: "rgba(255, 0, 0, 0.7)" },
  { id: "work", name: "Work", iconColour: "rgba(0, 183, 235, 0.7)" },
] as const;

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("sidebar") !== "closed";
  });
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    localStorage.setItem("sidebar", sidebarOpen ? "open" : "closed");
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const iconSize = sidebarOpen ? 18 : 22;

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    getUserData(user.uid)
      .then((data) => setUserData(data))
      .catch((error) => sendErrorToast(error));
  }, [user?.uid, loading]);

  return (
    <nav
      id="navbar"
      className={`w-72 max-w-[25vw] min-h-full flex flex-col gap-5 p-3 rounded-xl bg-[#f4f4f4] transition-all duration-300 overflow-hidden text-nowrap ${
        !sidebarOpen && "close-nav"
      }`}
    >
      <div className={`flex flex-col ${sidebarOpen && "gap-2"}`}>
        {/* Menu title & Collapse button */}
        <div
          className={`flex ${
            sidebarOpen
              ? "w-full gap-5 items-center justify-between"
              : "justify-center"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              sidebarOpen
                ? "opacity-100 w-auto"
                : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Menu
          </h2>
          <button
            onClick={toggleSidebar}
            className={`hover:bg-[#edebeb] rounded-lg p-2 cursor-pointer transition-all duration-300 ${
              !sidebarOpen && "w-full flex justify-center rotate-y-180"
            }`}
          >
            <ArrowLeftFromLine size={22} className="text-gray-600" />
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full">
          {sidebarOpen ? (
            <>
              <Search
                size={16}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600"
              />
              <input
                name="search"
                type="text"
                placeholder="Search"
                maxLength={30}
                className="w-full border border-gray-300 outline-none p-2 pl-8 rounded text-sm text-gray-600 placeholder:text-gray-600 focus:border-gray-600 transition-colors duration-300"
              />
            </>
          ) : (
            <a className="p-2 rounded-lg flex items-center justify-center hover:bg-[#edebeb] cursor-pointer">
              <Search size={22} className="text-gray-600" />
            </a>
          )}
        </div>
      </div>

      {!sidebarOpen && <hr className="text-gray-400/35 rounded-lg" />}

      <div className={`flex flex-col gap-5 ${sidebarOpen ? "mt-5" : ""}`}>
        {/* Tasks Nav Section */}
        <div className="flex flex-col gap-2">
          {sidebarOpen && (
            <h3 className="text-black font-semibold text-xs">TASKS</h3>
          )}

          <ul>
            {tasksNavItems.map((item) => (
              <li
                key={item.name}
                onClick={() => setActiveTab(item.id)}
                className={`p-2 rounded-lg hover:cursor-pointer transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-[rgba(213,211,211,.6)]"
                    : "hover:bg-[#edebeb]"
                }`}
              >
                <a
                  className={`flex items-center ${
                    sidebarOpen ? " gap-3 justify-start" : "justify-center"
                  }`}
                >
                  <span className="w-6 flex justify-center">
                    {<item.icon size={iconSize} className="text-gray-600" />}
                  </span>
                  <span
                    className={`text-gray-600 text-sm ${
                      activeTab === item.id ? "font-bold" : ""
                    } ${
                      sidebarOpen
                        ? "opacity-100 w-auto"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className="text-gray-400/15 rounded-lg" />

        {/* Lists */}
        <div className="flex flex-col gap-2">
          {sidebarOpen && (
            <h3 className="text-black font-semibold text-xs">LISTS</h3>
          )}
          <ul>
            {listsNavItems.map((item) => (
              <li
                key={item.name}
                onClick={() => setActiveTab(item.id)}
                className={`p-2 rounded-lg hover:cursor-pointer transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-[rgba(213,211,211,.6)]"
                    : "hover:bg-[#edebeb]"
                }`}
              >
                <a
                  className={`flex items-center ${
                    sidebarOpen ? " gap-3 justify-start" : "justify-center"
                  }`}
                >
                  <span
                    className={`${sidebarOpen ? "w-4 h-4" : "w-5 h-5"} rounded`}
                    style={{ backgroundColor: item.iconColour }}
                  />
                  <span
                    className={`text-gray-600 text-sm ${
                      activeTab === item.id ? "font-bold" : ""
                    } ${
                      sidebarOpen
                        ? "opacity-100 w-auto"
                        : "opacity-0 w-0 overflow-hidden"
                    }`}
                  >
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
            <li className="p-2 rounded-lg hover:bg-[#edebeb] hover:cursor-pointer">
              <a
                className={`flex items-center ${
                  sidebarOpen ? " gap-3 justify-start" : "justify-center"
                }`}
              >
                <span>
                  <Plus size={iconSize} className="text-gray-600" />
                </span>
                <span
                  className={`text-gray-600 text-sm ${
                    sidebarOpen
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0 overflow-hidden"
                  }`}
                >
                  Add new list
                </span>
              </a>
            </li>
          </ul>
        </div>

        <hr className="text-gray-400/15 rounded-lg" />
      </div>
      <div className="mt-auto">
        <ul>
          <li className="p-2 rounded-lg hover:bg-[#edebeb] hover:cursor-pointer">
            <a
              className={`flex items-center ${
                sidebarOpen ? " gap-3 justify-start" : "justify-center"
              }`}
            >
              <span>
                <SlidersHorizontal size={iconSize} className="text-gray-600" />
              </span>
              <span
                className={`text-gray-600 text-sm ${
                  sidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                Settings
              </span>
            </a>
          </li>
          <li className="p-2 rounded-lg hover:bg-[#edebeb] hover:cursor-pointer">
            <a
              onClick={() => signOut(auth)}
              className={`flex items-center ${
                sidebarOpen ? " gap-3 justify-start" : "justify-center"
              }`}
            >
              <span>
                <LogOut size={iconSize} className="text-gray-600" />
              </span>
              <span
                className={`text-gray-600 text-sm ${
                  sidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                Log Out
              </span>
            </a>
          </li>
        </ul>
        <hr className="mt-2 text-gray-400/15 rounded-lg" />
        {userData ? (
          <div
            className={`w-full p-2 flex items-center rounded-lg ${
              sidebarOpen ? "justify-start gap-5" : "justify-center"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full  ${
                !sidebarOpen && "cursor-pointer"
              }`}
            >
              <img src={userData?.userIcon} />
            </div>
            <div
              className={`flex flex-col text-nowrap overflow-hidden text-ellipsis select-none ${
                sidebarOpen
                  ? "opacity-100 w-auto"
                  : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              <span className="text-sm text-black">{userData?.username}</span>
              <span className="text-xs text-gray-500">
                {censorEmail(userData?.email)}
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`w-full p-2 flex items-center gap-5 border-t border-t-gray-400/15 animate-pulse ${
              sidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gray-300/70" />

            {sidebarOpen && (
              <div className="flex flex-col gap-2 overflow-hidden">
                <div className="h-3 w-24 rounded bg-gray-300/70" />
                <div className="h-2.5 w-36 rounded bg-gray-300/50" />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
