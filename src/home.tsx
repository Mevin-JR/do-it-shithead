import { auth } from "../firebase";
import { Toaster } from "react-hot-toast";
import Navbar, { TabKey } from "./components/home-components/navbar";
import { JSX, useState } from "react";
import Upcoming from "./components/home-components/tabs/upcoming";

const tabComponents: Record<TabKey, JSX.Element> = {
  upcoming: <Upcoming />,
  calender: <></>,
  personal: <></>,
  today: <></>,
  work: <></>,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");
  return (
    <main className="w-screen h-dvh grid grid-cols-[auto_1fr] gap-8 p-5 box-border bg-white dark:bg-[#121212] text-black dark:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        <h1>Welcome {auth.currentUser?.displayName}</h1>
        {tabComponents[activeTab] ?? <div>No content yet</div>}
      </div>
      <Toaster />
    </main>
  );
}
