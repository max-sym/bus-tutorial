import React from "react"
import { WiMoonAltWaningCrescent6 } from "@react-icons/all-files/wi/WiMoonAltWaningCrescent6"
import { WiDaySunny } from "@react-icons/all-files/wi/WiDaySunny"
import { useManageDarkMode } from "@bus/ui"

export const DarkModeSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useManageDarkMode()

  const Icon = isDarkMode ? WiDaySunny : WiMoonAltWaningCrescent6

  return (
    <button onClick={toggleDarkMode} className="px-2 text-white">
      <Icon className="w-6 h-6 text-current" />
    </button>
  )
}
