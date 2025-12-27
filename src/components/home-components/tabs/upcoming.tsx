import AddTaskBar from "../addTaskBar";
import TabHeader from "../tabHeader";

export default function Upcoming() {
  return (
    <div className="flex flex-col gap-5">
      <TabHeader heading="Upcoming" />
      <AddTaskBar tabId="upcoming" />
    </div>
  );
}
