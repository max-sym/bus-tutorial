import { Login } from "./login"
import { Checker } from "./checker"

export type PageType = {
  name: string
  path: string
  component: () => JSX.Element
  isPrivate?: boolean
}

export const pages: { [x: string]: PageType } = {
  login: {
    name: "login",
    path: "/",
    component: Login,
  },
  checker: {
    name: "checker",
    path: "/checker",
    component: Checker,
    isPrivate: true,
  },
}
