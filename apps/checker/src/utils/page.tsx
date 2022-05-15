import { Navigate } from "react-router-dom"
import { pages, PageType } from "@/pages"
import { useAuthStore } from "@/store"

export const Page = ({ page }: { page: PageType }) => {
  const worker = useAuthStore(store => store.worker)

  const workerBoolean = page.isPrivate ? !!worker : !worker

  const redirect: keyof typeof pages = page.isPrivate ? "login" : "checker"

  return workerBoolean ? (
    <page.component />
  ) : (
    <Navigate to={pages[redirect].path} />
  )
}
