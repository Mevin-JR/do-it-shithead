import { Toaster } from "react-hot-toast";
import Navbar, { TabKey } from "./components/home-components/navbar";
import { JSX, useState } from "react";
import Upcoming from "./components/home-components/tabs/upcoming";
import Today from "./components/home-components/tabs/today";
import Calendar from "./components/home-components/tabs/calendar";
import TasksDisplay from "./components/home-components/tasksDisplay";
import { useAuth } from "./context/authContext";

const tabComponents: Record<TabKey, JSX.Element> = {
  upcoming: <Upcoming />,
  today: <Today />,
  calendar: <Calendar />,
  personal: <></>,
  work: <></>,
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const { user } = useAuth();
  const testChat = async () => {
    if (!user) throw new Error("User not found");

    const res = await fetch(
      "http://127.0.0.1:5001/do-it-shithead/us-central1/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          personality: `You are a senior software engineer with high standards.

Rules:
- Use harsh, blunt language for emphasis.
- Be aggressively direct.
- Prioritize clarity over politeness.
- Be concise and technical.
- Do not sugarcoat mistakes; point them out clearly.
- Prefer best practices over shortcuts.
- Give code examples when relevant.
- Avoid emojis.
- If the question is vague, ask for clarification instead of guessing.

Tone:
- Direct
- Slightly blunt, but helpful`,

          messages: [
            {
              role: "user",
              content: "I'm not feeling like doing my tasks",
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log(data.reply);
  };

  return (
    <main className="relative w-screen h-dvh grid grid-cols-[auto_1fr] gap-8 p-5 box-border bg-white dark:bg-[#121212] text-black dark:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col gap-5">
        {tabComponents[activeTab] ?? <div>No content yet</div>}
        <TasksDisplay tabId={activeTab} />
      </div>
      <button
        className="absolute top-0 left-0"
        onClick={() => console.log(testChat())}
      >
        Test
      </button>
      <Toaster />
    </main>
  );
}
