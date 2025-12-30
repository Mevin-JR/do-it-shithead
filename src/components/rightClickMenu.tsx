import { listen } from "@tauri-apps/api/event";
import { Menu } from "@tauri-apps/api/menu";
import React, { useEffect } from "react";

export default function RightClickMenu() {
  const menuPromise = Menu.new({
    items: [
      { id: "ctx_option1", text: "Option 1" },
      { id: "ctx_option2", text: "Option 2" },
    ],
  });

  async function clickHandler(event: React.MouseEvent) {
    event.preventDefault();
    const menu = await menuPromise;
    menu.popup();
  }

  useEffect(() => {
    const unlistenPromise = listen<string>("menu-event", (event) => {
      if (!event.payload.startsWith("ctx")) return;
      switch (event.payload) {
        default:
          console.log("Unimplemented application menu id:", event.payload);
      }
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, []);

  return (
    <div
      onContextMenu={clickHandler}
      style={{ padding: "20px", border: "1px solid #ccc" }}
    >
      Right-click anywhere in this area to see the context menu.
    </div>
  );
}
