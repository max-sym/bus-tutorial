import { UserType } from "store"

export const getSidebarItemsList = (user: UserType) => [
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
  ...(user
    ? [
        {
          title: "Account",
          link: "/account",
        },
        {
          title: "Log Out",
          link: "/logout",
        },
      ]
    : [
        {
          title: "Login",
          link: "/login",
        },
        {
          title: "Register",
          link: "/register",
        },
      ]),
]
