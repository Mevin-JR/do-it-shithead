import { Toaster } from "react-hot-toast";
import Navbar, { TabKey } from "./components/home-components/navbar";
import { JSX, useState } from "react";
import Upcoming from "./components/home-components/tabs/upcoming";
import Today from "./components/home-components/tabs/today";
import Calendar from "./components/home-components/tabs/calendar";
import TasksDisplay from "./components/home-components/tasksDisplay";
import { openContextMenu } from "./utils/contextMenu";

const tabComponents: Record<TabKey, JSX.Element> = {
  upcoming: <Upcoming />,
  today: <Today />,
  calendar: <Calendar />,
  personal: <></>,
  work: <></>,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  return (
    <main className="w-screen h-dvh grid grid-cols-[auto_1fr] gap-8 p-5 box-border bg-white dark:bg-[#121212] text-black dark:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openContextMenu("home");
        }}
        className="flex flex-col gap-5"
      >
        {tabComponents[activeTab] ?? <div>No content yet</div>}
        <TasksDisplay tabId={activeTab} />
      </div>
      <Toaster />
    </main>
  );
}
