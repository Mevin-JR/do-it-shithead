import Navbar, { Tab } from "../components/home-components/navbar";
import { useState } from "react";
import { openContextMenu } from "../utils/contextMenu";
import TaskEditor from "../components/home-components/taskEditor";
import TabContent from "../components/home-components/tabContent";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");

  return (
    <main
      className="w-screen h-dvh grid grid-cols-[auto_1fr_auto] gap-8 p-5 box-border bg-white dark:bg-[#121212] text-black dark:text-white"
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openContextMenu("home"); // FIXME: Better naming for menu, maybe "task-tab"
      }}
    >
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} />
      <TaskEditor activeTab={activeTab} />
    </main>
  );
}
