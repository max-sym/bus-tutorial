import { WorkerType } from "@/store"

export const getSidebarItemsList = (worker: WorkerType) => [
  ...(worker
    ? [
        {
          title: "Checker",
          link: "/Checker",
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
