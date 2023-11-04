import { MenuItem } from "./types";

export const authMmenuItems: MenuItem[] = [
  { title: "Blogs", url: "/blog" },
  { title: "Write", url: "/blog/add" },
  { title: "Search", url: "/search" },
];
export const nonAuthMenuItems: MenuItem[] = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
];
