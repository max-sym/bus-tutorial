import { useCallback, useEffect, useMemo, useState } from "react"

export const useManageDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return (
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  })

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(i => !i)
  }, [])

  useEffect(() => {
    document.documentElement.classList[isDarkMode ? "add" : "remove"]("dark")
    localStorage.setItem("darkMode", isDarkMode + "")
  }, [isDarkMode])

  return useMemo(
    () => ({ isDarkMode, setIsDarkMode, toggleDarkMode }),
    [isDarkMode, setIsDarkMode, toggleDarkMode]
  )
}
