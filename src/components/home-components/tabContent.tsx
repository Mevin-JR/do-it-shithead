import { useEffect, useState } from "react";
import AddTaskBar from "./addTaskBar";
import { Tab } from "./navbar";
import TabHeader from "./tabHeader";
import TasksDisplay from "./tasksDisplay";
import dayjs from "dayjs";
import { useTaskStore } from "../../hooks/taskStore";

type TabContentProps = {
  activeTab: Tab;
};

export default function TabContent({ activeTab }: TabContentProps) {
  const [clockDisplay, setClockDisplay] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setClockDisplay(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const taskCount = useTaskStore((s) => s.getTabCount(activeTab));
  const timeFormat = "ddd HH:mm";

  return (
    <div className="h-full flex flex-col gap-5 min-h-0">
      <TabHeader tabId={activeTab} taskCount={taskCount} />
      <AddTaskBar tabId={activeTab} />
      <TasksDisplay tabId={activeTab} />

      <div className="border-t border-t-gray-200 flex justify-between items-center py-2 text-xs text-gray-400 font-mono">
        <p>{`${taskCount} Task(s)`}</p>
        <p>{clockDisplay.format(timeFormat)}</p>
      </div>
    </div>
  );
}
