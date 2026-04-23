import AddTaskBar from "./addTaskBar";
import { Tab } from "./navbar";
import TabHeader from "./tabHeader";
import TasksDisplay from "./tasksDisplay";

type TabContentProps = {
  activeTab: Tab;
};

export default function TabContent({ activeTab }: TabContentProps) {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <TabHeader tabId={activeTab} />
        <AddTaskBar tabId={activeTab} />
        <TasksDisplay tabId={activeTab} />
      </div>
    </div>
  );
}
