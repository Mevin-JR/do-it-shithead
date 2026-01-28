import { Image } from "@tauri-apps/api/image";
import { IconMenuItem, Menu, MenuItem } from "@tauri-apps/api/menu";

type ContextMenu = "default" | "home";
type ContextMenuFactory = () => Promise<Menu>;

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

const contextMenus: Record<ContextMenu, ContextMenuFactory> = {
  default: defaultContextMenu,
  home: homeContextMenu,
};
