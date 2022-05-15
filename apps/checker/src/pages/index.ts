import { RequestPasswordReset } from "./request-password-reset"
import { Login } from "./login"
import { Checker } from "./checker"
import { Logout } from "./logout"
import { Register } from "./register"
import { ResetPassword } from "./reset-password"
import { VerifyEmail } from "./verify-email"

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
  logout: {
    name: "logout",
    path: "/logout",
    component: Logout,
    isPrivate: true,
  },
  register: {
    name: "register",
    path: "/register",
    component: Register,
  },
  requestPasswordReset: {
    name: "request-password-reset",
    path: "/request-password-reset",
    component: RequestPasswordReset,
  },
  resetPassword: {
    name: "reset-password",
    path: "/reset-password",
    component: ResetPassword,
  },
  verifyEmail: {
    name: "verify-email",
    path: "/verify-email",
    component: VerifyEmail,
  },
  checker: {
    name: "checker",
    path: "/checker",
    component: Checker,
    isPrivate: true,
  },
}
