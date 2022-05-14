import { NavItemType } from "@bus-ui"

export const navItemsList: {
  [key: string]: NavItemType[]
} = {
  left: [
    {
      title: "About",
      link: "/#about",
    },
    {
      title: "VIP",
      link: "/#vip",
    },
    {
      title: "Reviews",
      link: "/#reviews",
    },
    {
      title: "FAQ",
      link: "/#faq",
    },
  ],
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
      title: "Account",
      link: "/account",
    },
    {
      title: "Log Out",
      link: "/logout",
    },
  ],
}
