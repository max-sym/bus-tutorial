import { NavItemType } from "@bus-ui"

export const navItemsList: {
  [key: string]: NavItemType[]
} = {
  left: [],
  right: [
    {
      title: "Login",
      link: "/login",
    },
    {
      title: "Register",
      link: "/register",
    },
  ],
  rightLoggedIn: [
    {
      title: "Checker",
      link: "/checker",
    },
    {
      title: "Log Out",
      link: "/logout",
    },
  ],
}
