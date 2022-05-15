import { Navigate } from "react-router-dom"
import { pages, PageType } from "@/pages"

// Temporary user authentication indicator.
const user = true

export const Page = ({ page }: { page: PageType }) => {
  const userBoolean = page.isPrivate ? !!user : !user

  const redirect: keyof typeof pages = page.isPrivate ? "login" : "checker"

  return userBoolean ? (
    <page.component />
  ) : (
    <Navigate to={pages[redirect].path} />
  )
}
