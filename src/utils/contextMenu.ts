import { Image } from "@tauri-apps/api/image";
import { IconMenuItem, Menu, MenuItem } from "@tauri-apps/api/menu";
import { removeTask, Task } from "./taskHandler";
import { truncateString } from "./userData";

type ContextMenu = "default" | "home" | "task";
type ContextMenuFactory = () => Promise<Menu>;

let currentTask: Task | null = null;

export const setContextTask = (task: Task) => {
  currentTask = task;
};

export const getContextTask = () => currentTask;

export const initContextMenu = () => {
  window.addEventListener("contextmenu", async (e) => {
    e.preventDefault();

    const menu = await defaultContextMenu();
    await menu.popup();
  });
};

export const openContextMenu = async (menuId: ContextMenu) => {
  const factory = contextMenus[menuId];
  if (!factory) return;

  const menu = await factory();
  await menu.popup();
};

export const defaultContextMenu = async () => {
  const refreshIcon = await Image.fromPath("assets/menu-icons/refresh.png");

  return await Menu.new({
    items: [
      await IconMenuItem.new({
        id: "refresh",
        icon: refreshIcon,
        text: "Refresh",
        action: () => {
          location.reload();
        },
      }),
    ],
  });
};

export const homeContextMenu = async () => {
  return await Menu.new({
    items: [
      await MenuItem.new({
        text: "Sample Item",
        action: () => {
          console.log("Sample item clicked");
        },
      }),
    ],
  });
};

export const taskContextMenu = async () => {
  const deleteIcon = await Image.fromPath("assets/menu-icons/trash.png");
  const task = getContextTask();

  return await Menu.new({
    items: [
      await IconMenuItem.new({
        id: "delete",
        icon: deleteIcon,
        text: task
          ? `Delete "${truncateString(task.task, 10)}"`
          : "Delete task",
        action: () => {
          if (!currentTask) return;
          removeTask(currentTask.id, currentTask.tabId);
        },
      }),
    ],
  });
};

const contextMenus: Record<ContextMenu, ContextMenuFactory> = {
  default: defaultContextMenu,
  home: homeContextMenu,
  task: taskContextMenu,
};
