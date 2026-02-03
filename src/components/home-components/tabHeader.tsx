import { useTaskStore } from "../../utils/taskStore";
import { TabKey } from "./navbar";

type TabHeaderProps = {
  tabId: TabKey;
};

export default function TabHeader({ tabId }: TabHeaderProps) {
  const heading = tabId.charAt(0).toUpperCase() + tabId.slice(1);
  const taskCount = useTaskStore((s) => s.getTabCount(tabId));

  return (
    <h1 className="w-fit flex items-center gap-5 text-black font-semibold text-4xl">
      {heading}
      {
        <span className="text-gray-700 text-3xl border border-gray-600/25 rounded-lg p-2">
          {taskCount}
        </span>
      }
    </h1>
  );
}
