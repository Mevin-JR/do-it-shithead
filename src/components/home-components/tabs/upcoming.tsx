import AddTaskBar from "../addTaskBar";
import { TabKey } from "../navbar";
import TabHeader from "../tabHeader";
import TasksDisplay from "../tasksDisplay";

export default function Upcoming() {
  const TAB_ID: TabKey = "upcoming";
  return (
    <div className="flex flex-col gap-5">
      <TabHeader tabId={TAB_ID} />
      <AddTaskBar tabId={TAB_ID} />
      <TasksDisplay tabId={TAB_ID} />
    </div>
  );
}
